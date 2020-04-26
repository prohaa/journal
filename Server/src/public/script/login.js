let login_app = new Vue({
    el: '#login_app',
    data: {
        login: 'mylogin',
        password: 'mypass', 
        responce: "responce"
    },
    methods: {
        myFunc: function (e) {
            e.preventDefault();
            let formData = new FormData(document.forms.login);
            formData.append(this.login, this.password)
            let xhr = new XMLHttpRequest();
            xhr.open('POST', "/login");
            xhr.send();

            
            xhr.onload = function() {
                if (xhr.status != 200) { 
                  console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); 
                } else { 
                  console.log(`Готово, получили ${xhr.response.length} байт`); 
                  login_app.responce = xhr.response;
                } 
              };

            xhr.onerror = function() {
                console.log(error)
            }
        } 
    }   
})