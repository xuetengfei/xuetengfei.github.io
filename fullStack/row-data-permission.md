## 后台管理系统-行数据权限

有一张 list_package 表。  
有 2 个角色：管理员、普通用户。

管理员角色有修改和访问所有数据的权限。  
普通用户角色只能访问自己有权限的数据，并且不能修改数据。

设计一个行数据权限，使得管理员权限可用修改 那些用户可用访问

那些行数据假设 list_package 表中 name 字段，有 3 种 one1 two2 third3，管理员通过
name 字段动态修改权限。

新增一张表 data_permissions，id、list_package_name ，users 等字段，管理员可以修
改 users 来控制普通用户权限，

比如 data_permissions 中 list_package_name 等于 one1 的 users 里面有张三。
data_permissions 中 list_package_name 等于 third3 的 users 里面也有张三。

普通用户张三，他可以访问 list_package 表里面 name 等于 one1 数据，和 name 等于
third3 的 数据，其他的不可访问

```sql
CREATE TABLE data_permissions (
    id INT PRIMARY KEY,
    list_package_name VARCHAR(50),
    users JSON,
    CHECK (json_typeof(users) = 'array'), -- 确保 users 字段是 JSON 数组
    FOREIGN KEY (list_package_name) REFERENCES list_package(name)
);


-- 插入用户数据
INSERT INTO users (id, username, role) VALUES
(1, '管理员', '管理员'),
(2, '张三', '普通用户'),
(3, '李四', '普通用户'),
(4, '王五', '普通用户');

-- 插入 list_package 数据
INSERT INTO list_package (id, name) VALUES
(1, 'one1'),
(2, 'two2'),
(3, 'third3');

-- 插入 data_permissions 数据
INSERT INTO data_permissions (id, list_package_name, users) VALUES
(1, 'one1', '[2, 3]'),  -- 给 'one1' 添加张三和李四的权限
(2, 'third3', '[2, 4]'); -- 给 'third3' 添加张三和王五的权限

```

## Egg.js 中间件来进行权限判断

在 Egg.js 中，你可以通过中间件来进行权限判断。以下是一个简单的示例，演示如何使用
`data_permissions` 表中的数据进行权限控制。首先，你需要确保你的 Egg.js 项目中有
相关的数据库模型（比如使用 Sequelize 或其他数据库 ORM）。

在 Egg.js 中，可以使用 Egg-sequelize 插件来方便地与 Sequelize 集成，或者使用其他
适用的数据库插件。以下示例假设你使用了 Egg-sequelize。

首先，定义 `DataPermission` 模型：

```javascript
// app/model/data_permission.js
module.exports = app => {
  const { STRING, JSON, INTEGER } = app.Sequelize;

  const DataPermission = app.model.define('data_permission', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    list_package_name: STRING,
    users: JSON,
  });

  return DataPermission;
};
```

在 Egg.js 中，你可以使用中间件来进行权限判断。以下是一个简单的中间件，用于检查用
户是否有访问某个 `list_package_name` 的权限：

```javascript
// app/middleware/checkPermission.js
module.exports = () => {
  return async (ctx, next) => {
    const { list_package_name } = ctx.params;
    const userId = ctx.user.id; // 假设用户信息已经在请求中被解析并存储在 ctx.user 中

    // 查询 data_permissions 表，检查用户是否有权限
    const permission = await ctx.model.DataPermission.findOne({
      where: { list_package_name },
    });

    if (permission && permission.users.includes(userId)) {
      // 用户有权限，继续执行下一个中间件或路由处理
      await next();
    } else {
      // 用户没有权限，返回错误信息
      ctx.status = 403;
      ctx.body = { error: 'Permission denied' };
    }
  };
};
```

确保在 `config/config.default.js` 中启用中间件：

```javascript
// config/config.default.js
module.exports = {
  middleware: ['checkPermission'], // 使用中间件
};
```

然后，你可以在路由中使用这个中间件：

```javascript
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  const checkPermission = app.middleware.checkPermission(); // 获取中间件实例

  // 示例路由，使用中间件进行权限检查
  router.get(
    '/api/data/:list_package_name',
    checkPermission,
    controller.data.getData,
  );
};
```

在这个示例中，`checkPermission` 中间件会检查用户是否有访问某个
`list_package_name` 的权限。如果有权限，将继续执行后续的中间件或路由处理；如果没
有权限，将返回状态码 403 和相应的错误信息。请根据实际需求调整这个示例以适应你的
应用程序结构和数据库设计。

### 数据权限设计概览

在 `data_permissions` 表中，用于实现行数据权限的设计包含以下关键元素：

1. **用户表 (`users`):**

   - 包含用户信息，至少需要包括用户 ID (`id`)、用户名 (`username`) 和角色
     (`role`)。

2. **数据表 (`list_package`):**

   - 包含数据信息，至少需要包括数据 ID (`id`) 和数据名称 (`name`)。

3. **权限表 (`data_permissions`):**
   - 包含了每个用户对每个数据的权限信息。
   - `id`: 权限记录的唯一标识符。
   - `list_package_name`: 与 `list_package` 表关联，表示数据的名称。
   - `users`: 存储 JSON 数组，表示拥有访问权限的用户 ID。

### Egg.js 行数据鉴权实现

1. **中间件 (`checkPermission.js`):**

   - 中间件用于在请求到达控制器之前检查用户是否具有访问某个数据的权限。
   - 从请求参数中获取 `list_package_name`。
   - 从用户信息中获取用户 ID。
   - 查询 `data_permissions` 表，检查用户是否具有访问权限。
   - 如果有权限，继续执行下一个中间件或路由处理，否则返回权限被拒绝的响应。

2. **路由配置 (`router.js`):**

   - 在路由配置中使用该中间件，将其应用于需要进行行数据鉴权的路由。
   - 通过中间件配置，确保在请求到达控制器之前进行权限检查。

3. **控制器处理 (`data.js`):**
   - 在控制器中处理具体的业务逻辑，因为中间件已经进行了权限检查。
   - 控制器中可以根据业务需求直接操作数据库或返回相应的数据。

### 示例代码

以下是基于上述设计和实现的示例代码：

```javascript
// 示例代码仅为演示目的，具体实现可能需要根据实际需求进行调整。

// app/model/user.js
// 定义用户表模型

// app/model/list_package.js
// 定义数据表模型

// app/model/data_permission.js
// 定义权限表模型

// app/middleware/checkPermission.js
// 定义中间件，用于权限检查

// app/router.js
// 配置路由，使用中间件进行权限检查

// app/controller/data.js
// 控制器处理，处理具体的业务逻辑
```

以上是一个基本的行数据权限设计和 Egg.js 行数据鉴权实现的描述。具体的实现细节可能
会根据你的应用需求、数据库结构和业务逻辑进行调整。

---

1. [项目中心 - 权限管理 - 《有数 BI 用户手册》](https://bi.qiyukf.com/index/manual/p/data_role.html)
