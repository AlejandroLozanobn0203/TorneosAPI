function loadUsers()
{
  
}
function popUpLogin()
{
    if(document.getElementById("contenedorLogin")==null)
    {
        console.log("creamos contendor")
        var body=document.getElementById("body-index")
        var div_login=document.createElement("div")
        div_login.classList.add("contenedorLogin","animacionLogin","animated","jackInTheBox")
        div_login.setAttribute("id","contenedorLogin")
        var closeButtom=document.createElement("buttom")
        var textoClose=document.createTextNode("X")  
        closeButtom.setAttribute("class","buttonClose")
        closeButtom.setAttribute("onclick","closeLoginPopUp()")
        closeButtom.appendChild(textoClose)
        div_login.appendChild(closeButtom)
        addForm(div_login)
        body.appendChild(div_login)
    }
    else{
        console.log("contendor creado")
    }


}
function addForm(obj)
{
    var form=document.createElement("form")
    form.setAttribute("id","logInForm")
    form.setAttribute("action","../prueba.php")
    form.setAttribute("method","post")
    setDivToForm(form,"loginEmail","Email")
    setDivToForm(form,"loginPassword","Password")
    var submitButtom=document.createElement("buttom")
    var texto_buttom=document.createTextNode("Log In")
    submitButtom.setAttribute("onclick","logInSubmit()")
    submitButtom.classList.add("btn","logInButtom")
    submitButtom.appendChild(texto_buttom)
    form.appendChild(submitButtom)
    obj.appendChild(form)

}
function setDivToForm(form,idInput,labelText)
{
    var label_form=document.createElement("label")
    var input_form=document.createElement("input")
    var button_form=document.createElement("button")
    var div_form=document.createElement("div")
    var texto_label

    label_form.setAttribute("for",idInput)
    texto_label=document.createTextNode(labelText)
    label_form.appendChild(texto_label)
    input_form.setAttribute("id",idInput)
    input_form.setAttribute("name",idInput)
    input_form.setAttribute("class","form-control")
    if(labelText=="Password")
    {
      input_form.setAttribute("type","password")
      console.log("pepe")
    }
    div_form.setAttribute("class","form-group")
    div_form.appendChild(label_form)
    div_form.appendChild(input_form)
    form.appendChild(div_form)
}
function closeLoginPopUp()
{
    var div_login=document.getElementById("contenedorLogin")
    div_login.classList.remove("jackInTheBox")
    div_login.classList.add("zoomOut")
    setTimeout(() => { deleteItem(div_login); }, 900);
}
function deleteItem(obj)
{
    obj.parentNode.removeChild(obj)
}
function logInSubmit()
{
    var form=document.getElementById("logInForm")
    if(validarEmail(form.loginEmail) && form.loginPassword.value!="")
    {
          ajaxGet("http://127.0.0.1/prueba.php", function(respuesta)
          {
              var users=JSON.parse(respuesta);
              if(vereficaDatos(users,form))
              {
                Swal.fire({
                  icon: 'success',
                  title: 'Logeado con éxito\n ¡Recuerda, lo importante es participar!',
                  showConfirmButton: false,
                  timer: 1500
                })
                setTimeout(() => {  window.location.href="home.html"; }, 1000);
              }
              else{
                campoErroneo("Usuario y/o contraseña no reconocidos")
              }
          })
    }
}
function validarEmail(EmailInput) {
    if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(EmailInput.value))
    {
        return true;
    } 
    else 
    {
        if(EmailInput.value!="")
        {
            campoErroneo("Has introducido mal el Correo Electrónico") 
        }
        else
        {
           campoVacio()
        }
        return false;
    }
  }
  function campoErroneo(stringError)
  {
    Swal.fire({
        icon: 'error',
        title: '¡Vaya!',
        text: stringError,
      })
  }
  function campoVacio()
  {
    Swal.fire({
        icon: 'warning',
        title: '¡Cuidado!',
        text: 'Recuerda rellenar los campos',
      })
  }
  function ajaxGet(url, callback) 
  {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function() {
      if (req.status >= 200 && req.status < 400) {
        // Llamada ala función callback pasándole la respuesta
        callback(req.responseText);
      } else {
        console.error(req.status + " " + req.statusText);
      }
    });
    req.addEventListener("error", function(){
      console.error("Error de red");
    });
    req.send(null);
  }
  function vereficaDatos(users,form)
  {
    var i=1;
    var EmailInput=form.loginEmail.value
    var PasswordInpunt=form.loginPassword.value
    while(users[i]!=undefined)
    {
      if(users[i].email==EmailInput && users[i].password==PasswordInpunt)
      {
        return true;
      }
      i++
    }
  }
