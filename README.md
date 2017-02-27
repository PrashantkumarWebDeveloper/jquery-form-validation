# JQUERY FORM VALIDATION PLUGIN
This plugin is based on jQuery library and helps in validating html forms. Plugin provides default error messages which can be customised.

[Getting started/Quick start guide]()

[Documentation]()

[Exapmles]()


## Getting Started/Quick Start Guide:

Take a look to the following code first:

```html
<!DOCTYPE html>
<html>
  <head>
      <title>Jquery validation plugin</title>
    </head>
  <body>
      <form id=”myForm” onsubmit=”return app.validateForm()” novalidate=”true” >
          <div>
              <input name=”first_name” class=”isRequired isChar” onblur="app.validateField(this);">
              <span class=”error”></span>
          </div>
          <div>
              <input name=”last_name” class=”isRequired isChar” onblur="app.validateField(this);">
              <span class=”error”></span>
          </div>
          <button type=”reset” onclick=” app.resetForm()”>Reset</button>
          <button type=”submit”>Submit</button>
       </form>
    <body>

</html>
 
 <!--Add source files-->
 <script src=”path/to/jquery.min.js”></script>
 <script src=”path/to/validation.js”></script>
 <script>
  var app= validationJs(“#myForm”);
 </script>
 ```
 
### Step wise guide:

***Step 1 (Including Library):***

This plugin is based on jQuery library, so make sure you have included (linked) jQuery library in your webpage. Now include validation.js in your webpage after jQuery link as shown below.

```
<script src="path/to/jquery.min.js" type="text/javascript" ></script>
<script src="path/to/validation.js" type="text/javascript" ></script>
```

***Step 2 (Plugin Initialization):***

After adding library path properly you need to initialize this plugin. For this you will use following code:
```javascript
var app=validationJs(formSelector);
```

Here “formSelector” is the css selector for your form. You can use ID, Class or anything according to your convenience.

For example:


```html
<!--If you have created form with id “myForm”:-->
<form id=”myForm”>
…
…
</form> 

  
<!--You need to initialize plugin by using following line of code-->

<script type="text/javascript">
    var app=validationJs('#myform');
</script>
```

***Step 3 (Adding “novalidate”):***

Add novalidate=”true” (or novalidate) in form tag, so that it will not use inbuilt HTML5 Validation.
```
  <form id=”myForm” novalidate=”true”>
    …
    …
  </form> 
```

***Step 4 (Adding element with “error” class):***

Add an element next to Input element (or next to input's parent and so on), with error class to show error messages.
Example:
```
<div>
  <input type=”text”/>
  <!--error element-->
  <span class=”error”></span>
</div>
```
You can add error element as next element to input or parent of input. Additionally use error class to style your error message’s color/font etc.

***Step 5 (Adding classes for validation):***

Depending upon the requirements, add validation classes in your input element. Following validation classes are available:

- __isRequired__ (Required field)
- __isPhone__ (Indian standered mobile no.)
- __isInteger__ (Integer, ex: 12, 25)
- __isNumber__ (Number, ex: 10, 11.5)
- __isDecimal__ (Decimal, ex: 11.5, 12.30)
- __isDigits__ (Digits, use where length(no of digits) of integer matters)
- __isEmail__ (Email)
- __isUrl__ (URL)
- __isDate__ (Defualt format yyyy/mm/dd)
- __isRegex__ (regular expression. pattern attribute is required)
- __isChar__ (charecters. A-Z and a-z)
- __isLength__ (Length of input. Either min or max or both(min and max) atribute(s) should present)
- __isAlphaNumeric__ (alphanumeric charecters. a-z, A-Z and 0-9)


###### Note: Never use "isLength" in combination with "isInteger", "isNumber", and "isDecimal".


Above classes can be used in combination or alone. We will learn about these classes in detail later.


Example:
```html
<input class=”isRequired isPhone”>
```


***Step 6 (Validating field):***

Bind the validation method to input field with events. You need to pass the reference of input field.
Example:
```html
<input class=”isRequired isPhone” onblur=”app.validateField(this)” >
```

The method “app. validateField(this)” will validate this input field onblur event. If the input field is invalid, it will show error in error element (element with class "error") and in case of valid input it hide and remove error message from error element. Passing “this” is required in order to identify input field by plugin.
###### Note: “app. validateField(this)” also return true/false for valid/invalid inputs respectively.

***Step 7 (Validating Form):***

Bind form to validate all fields on submit.

Example:
```html
<form onsubmit=”return app.validateForm()” novalidate=”true”>
  …
  …
</form>
```

The method “app.validateForm()”, validates all fields of the form at once and show errors if any. “return app.validateForm()” will prevent form submission when errors occurred.

***Step 8 (Reset button):***

Call “app.resetForm()” on click event of reset button. It hides all errors and set form in Initial condition.
Example:
```html
<button type=”reset” onclick=”app.resetForm()”>Reset</button>
```



Now you are all set up and ready to fly!!

## Documentation

[Understanding error classes](#understanding-error-classes)

[Plugin Options and Overriding defualt error messages](#plugin-options-and-overriding-defualt-error-messages)

[Refreshing data and bindings](#refreshing-data-and-bindings)

[Adding custom error messages](#adding-custom-error-messages)

[Adding custome rules to plugin](adding-custome-rules-to-plugin)



### Understanding error classes
(will be updated soon)
### Plugin Options and Overriding defualt error messages
(will be updated soon)
### Refreshing data and bindings
(will be updated soon)
### Adding custom error messages
(will be updated soon)
### Adding custome rules to plugin
(will be updated soon)



 
