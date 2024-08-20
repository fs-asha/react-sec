let sPageURL = window.location.href;
let url = new URL(sPageURL);
let searchParams = new URLSearchParams(url.search);
var var1= searchParams.get('var1');
var var2= searchParams.get('var2');
var var3= searchParams.get('var3');