## Required NPM's
**chalk**
**inquirer**
**table**
**mysql**

The different commands you will use with this node program will be.

###node bamazoncustomer.js
This will give you the option to purchase a product.
![Customer Purchase](/images/CustomerPurchase.PNG)
It will then produce you products total and keep a running tally of how much revenue has been produced by that product.
![Customer Total](/images/customertotal.PNG)

###node bamazonmanager.js
This will prompt you with the initial manager screen
![Initial Manager Screen](/images/initialmanscreen.PNG)
Then you will be able to make your selection by using the arrow key to drop down to the selection you would like to make.
First selection will show you what products are for sale.
![Products for Sale](/images/viewproductforsale.PNG)
Second option will show you what items you have with 5 or less in stock.
![View low inventory](/images/lowinventoryman.PNG)
Third selection will allow you to select a particular item by product id and add stock to it.
![Add Inventory](/images/addinventory.PNG)
Fourth selection will allow the manager to select an item in stock
![Add New Product](/images/addnewproduct.PNG)

###node bamazonSupervisor.js
Will show you this as the initial screen.
![Supervisor](/images/supervisor.png)
With first selection it will generate a table that includes all departments you have products for and their overhead cost. It will show you the overall sales for the department and compute what your total profit for that department is.
![View Department Sales](/images/table.PNG)
Second Selection will enable you create a new department.
![Create New Department](/images/newdepartment.PNG)


