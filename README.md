## Required NPM's
**chalk**
**inquirer**
**table**
**mysql**

The different commands you will use with this node program will be.

### node bamazoncustomer.js

This will give you the option to purchase a product.
Input the item you would like to purchase by product ID and how many you would like to purchase.

![Customer Purchase](/images/CustomerPurchase.PNG)

It will then inform the user how much the order total was and update the total product sales in the database.
![Customer Total](/images/customertotal.PNG)

### node bamazonmanager.js

This will prompt you with the initial manager screen

![Initial Manager Screen](/images/initialmanscreen.PNG)

Then you will be able to make your selection by using the arrow key to drop down to the selection you would like to make.

First selection will show you what products are for sale.

![Products for Sale](/images/viewproductforsale.PNG)

Second option will show you what items you have with 5 or less in stock.

![View low inventory](/images/lowinventoryman.PNG)

Third selection will allow you to select a particular item by product id and add stock to it.
This is done by inputting the product id for the item you would like to add then input the quantity you would like to add.

![Add Inventory](/images/addinventory.PNG)

Fourth selection will allow the manager to select an item in stock.
You initially will have to input the new products name, price per unit, department it would go to and then how many units to add.

![Add New Product](/images/addnewproduct.PNG)

### node bamazonSupervisor.js

Will show you this as the initial screen.

![Supervisor](/images/supervisor.png)

With first selection it will generate a table that includes all departments you have products for and their overhead cost. It will show you the overall sales for the department and compute what your total profit for that department is.

![View Department Sales](/images/table.PNG)

Second Selection will enable you create a new department by inputting the new departments name and it's overhead cost associated with it.

![Create New Department](/images/newdepartment.PNG)


