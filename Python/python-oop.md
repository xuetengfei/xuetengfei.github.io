# Python Object Oriented Programming

Python 是一种多范式的编程语言。它支持不同的编程方法。解决编程问题的一种流行方法是创建对象。这就是所谓的面向对象编程（OOP）。

一个对象有两个特征：属性 & 行为。
举例：鹦鹉
鹦鹉的属性有：名字，年纪，颜色
鹦鹉的行为有：唱歌，跳舞

OOP 意义在于创造高可复用的代码，DRY (Don't Repeat Yourself).

- Inheritance：继承
  在不修改现有类的情况下使用新类中的过程。
- Encapsulation：封装
  将类的私有细节隐藏于对象中。
- Polymorphism：多态
  对于不同的数据输入，使用不同的操作方式的共同操作的概念。
  A concept of using common operation in different ways for different data input.

## Class

类可以看作是对象的蓝图。

## Object

class 的实例化出一个对象

```python
class Parrot:

    # class attribute
    species = "bird"

    # instance attribute
    def __init__(self, name, age):
        self.name = name
        self.age = age

# instantiate the Parrot class
blu = Parrot("Blu", 10)
woo = Parrot("Woo", 15)

# access the class attributes 获取类的属性
print("Blu is a {}".format(blu.__class__.species))
print("Woo is also a {}".format(woo.__class__.species))

# Blu is a bird
# Woo is also a bird



# access the instance attributes 获取实例的属性
print("{} is {} years old".format( blu.name, blu.age))
print("{} is {} years old".format( woo.name, woo.age))

# Blu is 10 years old
# Woo is 15 years old
```

## Methods

方法是在类的主体内定义的函数。它们被用来定义对象的行为。

```python
class Parrot:

    # instance attributes
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # instance method
    def sing(self, song):
        return "{} sings {}".format(self.name, song)

    def dance(self):
        return "{} is now dancing".format(self.name)


# instantiate the object
blu = Parrot("Blu", 10)

# call our instance methods 实例的方法
print(blu.sing("'Happy'"))
print(blu.dance())


# Blu sings 'Happy'
# Blu is now dancing
```

## Inheritance

继承是一种创建新类的方法，用于使用现有类的细节而不修改它。新生成的类是派生类（或子类）。类似地，现有类是基类（或父类）。

```python
# parent class
class Bird:

    def __init__(self):
        print("Bird is ready")

    def whoisThis(self):
        print("Bird")

    def swim(self):
        print("Swim faster")

# child class
class Penguin(Bird):

    def __init__(self):
        # call super() function
        super().__init__()
        print("Penguin is ready")

    def whoisThis(self):
        print("Penguin")

    def run(self):
        print("Run faster")


peggy = Penguin()
peggy.whoisThis()
peggy.swim()
peggy.run()


# Bird is ready
# Penguin is ready
# Penguin
# Swim faster
# Run faster
```

在上面的程序中，我们创建了两个类，即 `Bird（父类）`和 `Penguin（子类）`。子类继承父类的函数，子类也修改父类的行为。此外，我们通过创建一个新的方法来扩展父类的函数。

## Encapsulation(封装)

在 Python 中使用 OOP，我们可以限制对方法和变量的访问。这防止数据被直接修改，这被称为封装。在 Python 中，我们用下划线作为前缀来表示私有属性，即单个`_`或`__`。

```python
class Computer:

    def __init__(self):
        self.__maxprice = 900

    def sell(self):
        print("Selling Price: {}".format(self.__maxprice))

    def setMaxPrice(self, price):
        self.__maxprice = price


c = Computer()
c.sell()

# change the price
c.__maxprice = 1000
c.sell()

# using setter function
c.setMaxPrice(1000)
c.sell()

# Selling Price: 900
# Selling Price: 900
# Selling Price: 1000

```

在上面的程序中，我们定义了一个 `Computer class`。我们使用了一种`__init__()`方法来储存计算机销售最大销售价格。我们试图修改价格。但是，我们不能改变它，因为 Python 把 `__maxprice`视为私有属性。为了改变这个值，我们使用了 setter 函数，即`setMaxPrice()`，以修改价格。

## Polymorphism

多态性是一种在多种形式（数据类型）中使用公共接口的能力（OOP）。
假设，我们需要给一个形状赋予颜色，有多个形状选项（矩形，正方形，圆形）。然而，我们可以使用相同的方法来着色任何形状。这个概念被称为多态性。

```python
class Parrot:
    def fly(self):
        print("Parrot can fly")

    def swim(self):
        print("Parrot can't swim")


class Penguin:
    def fly(self):
        print("Penguin can't fly")

    def swim(self):
        print("Penguin can swim")


# common interface
def flying_test(bird):
    bird.fly()


# instantiate objects
blu = Parrot()
peggy = Penguin()

# passing the object
flying_test(blu)
flying_test(peggy)


# Parrot can fly
# Penguin can't fly
```

在上面的程序中，我们定义了两个类`classes Parrot` 、`classes Penguin`。这两个类有相同的方法`fly()`,但是，这两个`fly()`方法，是不同的。我们定义一个函数`flying_test()`,这个函数接受一个对象，并且调用对象的`fly()`方法。

---

1. [Python OOP](https://www.programiz.com/python-programming/object-oriented-programming#introduction)
2. [Python Classes and Objects](https://www.programiz.com/python-programming/class)

---

## Python 中的类和对象是什么？

Python 是一种面向对象的编程语言。 与面向过程的编程不同，面向对象的编程主要强调函数，面向对象的编程强调对象。
对象只是对这些数据起作用的数据（变量）和方法（函数）的集合。 而且，class 是对象的蓝图。
我们可以将课程视为房屋的草图（原型）。 它包含有关地板，门，窗等的所有细节。根据这些描述，我们建造房屋。 房屋是对象。
因为，许多房屋可以从描述中制作，我们可以从一个类创建许多对象。 对象也称为类的实例，创建此对象的过程称为实例化 。

## 在 Python 中定义一个类

与函数定义一样，以关键字 def 开头，在 Python 中，我们使用关键字 class 定义一个类 。
第一个字符串称为 docstring (文档字符串)，并且有关于该类的简短描述。 虽然不是强制性的，但建议这样做。
这是一个简单的类定义。

```python
class MyNewClass:
    '''This is a docstring. I have created a new class'''
    pass
```

```python
class MyClass:
	"This is my second class"
	a = 10
	def func(self):
		print('Hello')

# Output: 10
print(MyClass.a)

# Output: <function MyClass.func at 0x0000000003079BF8>
print(MyClass.func)

# Output: 'This is my second class'
print(MyClass.__doc__)
```

## 在 Python 中创建对象

我们看到类对象可用于访问不同的属性。
它还可以用于创建该类的新对象实例（实例化）。 创建对象的过程类似于函数调用。

```python
ob = MyClass()
```

这将创建一个名为 ob 的新实例对象。 我们可以使用对象名称前缀来访问对象的属性。
属性可以是数据或方法。 对象的方法是该类的对应功能。 作为类属性的任何函数对象都定义该类对象的方法。
这意味着，由于 MyClass.func 是一个函数对象（类的属性）， ob.func 将是一个方法对象。

```python
class MyClass:
	"This is my second class"
	a = 10
	def func(self):
		print('Hello')

# create a new MyClass
ob = MyClass()

# Output: <function MyClass.func at 0x000000000335B0D0>
print(MyClass.func)

# Output: <bound method MyClass.func of <__main__.MyClass object at 0x000000000332DEF0>>
print(ob.func)

# Calling function func()
# Output: Hello
ob.func()
```

您可能已经注意到类中函数定义中的 self 参数，但是我们将该方法简单地称为 ob.func()而没有任何参数 。 它仍然有效。
这是因为，只要对象调用其方法，对象本身就作为第一个参数传递。 因此， ob.func()转换为 MyClass.func(ob) 。
通常，使用 n 个参数列表调用方法等效于使用通过在第一个参数之前插入方法对象而创建的参数列表来调用相应的函数。
由于这些原因，类中函数的第一个参数必须是对象本身。 这通常被称为自我 。 它可以另外命名，但我们强烈建议遵循惯例。
现在您必须熟悉类对象，实例对象，函数对象，方法对象及其差异。

## Python 中的构造函数

以双下划线`__`开头的类函数称为特殊函数，因为它们具有特殊含义。
一个特别感兴趣的是`__init__()`函数。 只要实例化该类的新对象，就会调用此特殊函数。
这种类型的函数在面向对象编程（OOP）中也称为构造函数。 我们通常用它来初始化所有变量。

```python
class ComplexNumber:
    def __init__(self,r = 0,i = 0):
        self.real = r
        self.imag = i

    def getData(self):
        print("{0}+{1}j".format(self.real,self.imag))

# Create a new ComplexNumber object
c1 = ComplexNumber(2,3)

# Call getData() function
# Output: 2+3j
c1.getData()

# Create another ComplexNumber object
# and create a new attribute 'attr'
c2 = ComplexNumber(5)
c2.attr = 10

# Output: (5, 0, 10)
print((c2.real, c2.imag, c2.attr))

# but c1 object doesn't have attribute 'attr'
# AttributeError: 'ComplexNumber' object has no attribute 'attr'
c1.attr

```

## 删除属性和对象
可以使用del语句随时删除对象的任何属性。 我们甚至可以使用del语句删除对象本身。