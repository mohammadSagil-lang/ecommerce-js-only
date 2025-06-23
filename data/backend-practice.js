//list of all the url paths that are supported are called backend API(Application programming interface)
const xhr = new XMLHttpRequest();
xhr.addEventListener("load", () => {
  
});
xhr.open("GET", "https://supersimplebackend.dev/products");
xhr.send();//sends a request to the server
