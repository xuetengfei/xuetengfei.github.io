继承使我们能够定义一个从父类中获取所有功能的类，并允许我们添加更多功能。 在本文中，您将学习如何在 Python 中使用继承。

## Python Inheritance Syntax

```python
class BaseClass:
  Body of base class
class DerivedClass(BaseClass):
  Body of derived class
```

## Example of Inheritance in Python

为了演示继承的使用，让我们举个例子。
多边形是具有 3 个或更多边的闭合图。 比方说，我们有一个名为 Polygon 的类定义如下。

```python
class Polygon:
    def __init__(self, no_of_sides):
        self.n = no_of_sides
        self.sides = [0 for i in range(no_of_sides)]

    def inputSides(self):
        self.sides = [float(input("Enter side "+str(i+1)+" : ")) for i in range(self.n)]

    def dispSides(self):
        for i in range(self.n):
            print("Side",i+1,"is",self.sides[i])
```

```python
class Triangle(Polygon):
    def __init__(self):
        Polygon.__init__(self,3)

    def findArea(self):
        a, b, c = self.sides
        # calculate the semi-perimeter
        s = (a + b + c) / 2
        area = (s*(s-a)*(s-b)*(s-c)) ** 0.5
        print('The area of the triangle is %0.2f' %area)
```

```python
>>> t = Triangle()

>>> t.inputSides()
Enter side 1 : 3
Enter side 2 : 5
Enter side 3 : 4

>>> t.dispSides()
Side 1 is 3.0
Side 2 is 5.0
Side 3 is 4.0

>>> t.findArea()
The area of the triangle is 6.00
```

我们可以看到，即使我们没有为类 `Triangle` 定义类似 `inputSides()`或`dispSides()`的方法，我们也可以使用它们。
如果在类中找不到属性，则搜索继续到基类。 如果基类本身是从其他类派生的，则递归地重复。

## Python 中的方法覆盖

在上面的示例中，请注意`__init__()`方法在两个类中`__init__()`定义， `Triangle`和`Polygon` 。 发生这种情况时，派生类中的方法将覆盖基类中的方法。 这就是说， `Triangle __init__()`在`Polygon`优先于它。

通常，当覆盖基本方法时，我们倾向于扩展定义而不是简单地替换它。 通过从派生类中的方法调用基类中的方法`Polygon.__init__()`从`Triangle __init__()`调用`Polygon.__init__()` 来完成相同的操作。

更好的选择是使用内置函数`super()`。 所以， `super().__init__(3)`相当于`Polygon.__init__(self,3)`并且是首选。 您可以在 Python 中了解有关 super（）函数的更多信息。

两个内置函数`isinstance()`和`issubclass()`用于检查继承。 函数`isinstance()`如果对象是类的实例或从其派生的其他类，则返回 True 。 Python 中的每个类都继承自基类 object 。

```python
>>> isinstance(t,Triangle)
True

>>> isinstance(t,Polygon)
True

>>> isinstance(t,int)
False

>>> isinstance(t,object)
True
```

类似地， `issubclass()`用于检查类继承。

```python

>>> issubclass(Polygon,Triangle)
False

>>> issubclass(Triangle,Polygon)
True

>>> issubclass(bool,int)
True
```
