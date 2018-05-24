$(document).ready(() => {
    $('#users').hide();
    
    $('#update').hide();
    $('#submit-btn').click((e) => {
        const userName = document.getElementById('exampleInputUsername1').value;
        const eMail = document.getElementById('exampleInputEmail1').value;
        const passWord = document.getElementById('exampleInputPassword1').value;
        if (userName != "" && eMail != "" && passWord != "")
            callApi(userName, eMail, passWord);
        else
            alert('please enter all the details..!!');
    });
});

const callApi = (userName, eMail, passWord) => {
    $.post('/user',
        {
            username: userName,
            email: eMail,
            password: passWord
        },
        (data, status) => {
            if (status == "success")
                alert('user details has been saved in mongodb...so chill!!');
        }
    );
};


const viewUsers = () => {
    $.get('/getusers',(data, status) => {
        if (status == "success")
            showUsers(data);
    })
    
};


const showUsers = (data) => {
    
    $('#container').hide();
    $('#users').fadeIn();

    for (let i = 0; i < data.length; i++) {

        let obj = JSON.parse(JSON.stringify(data[i]));

        let row = '<tr><th scope = \'col\'>' + (i + 1) + '</th>';
        row += '<td>' + obj.username + '</td>';
        row += '<td>' + obj.email + '</td>';
        row += '<td>' + obj.password + '</td>';
        row += '<td id = \'edituser\' onclick=\'editUser("'+obj.username+'")\'>EDIT PROFILE</td>';
        row += '<td><button id = \'delete-btn\' class=\'btn btn-outline-primary\' onclick=\'deleteUser("'+obj.username+'",'+ (i+1) +')\'>DELETE</button></td></tr>';

        $("#tab1").append(row);
    }
    $('#newuser').click(()=>{
        window.location.reload();
    });
};

const deleteUser = (name, i) => {
    if (confirm('Please confirm to delete the User..!!')) {
        $.post('/delete',
            {
                username: name
            },
            (data, status) => {
                if (status == "success")
                    document.getElementById('tab1').deleteRow(i);
            });
    }
};

const editUser = (name) => {
    let temp = name;
    
    $('#users').hide();
    $('#update').fadeIn();
   
    $('#update-btn').click(() => {
        let userName = document.getElementById('exampleInputUsername2').value;
        let eMail = document.getElementById('exampleInputEmail2').value;
        let passWord = document.getElementById('exampleInputPassword2').value;
        if (userName != "" && eMail != "" && passWord != "") { 
           
            $.post('/update',{
                usertoupdate : temp,
                username : userName,
                email : eMail,
                password : passWord
            },(data,status)=> {
                if (status == 'success')
                    alert('user updated..!!');
            });
        }
        else
            alert('please enter all the details..!!');
    });
};

