class Parrot:
    species = "bird"

    def __init__(self, name, age):
        self.name = name
        self.age = age


blu = Parrot("Blu", 10)
woo = Parrot("Woo", 15)

print("Blu is a {}".format(blu.__class__.species))
print("Woo is also a {}".format(woo.__class__.species))

print("{} is {} years old".format(blu.name, blu.age))
print("{} is {} years old".format(woo.name, woo.age))

# Blu is a bird
# Woo is also a bird
# Blu is 10 years old
# Woo is 15 years old
