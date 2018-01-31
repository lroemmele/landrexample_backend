jQuery.each( [ "put", "delete" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
        if ( jQuery.isFunction( data ) ) {
            type = type || callback;
            callback = data;
            data = undefined;
        }

        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        });
    };
});

let outputData = (data) => {
    $('#output').text(JSON.stringify(data, null, 2));
};

let getUsers = () => {
    $.get( "http://127.0.0.1:8080/api/users", function(data) {
        outputData(data);
    });
};

let addUser = (username, password) => {
    $.post( "http://127.0.0.1:8080/api/users", { username: username, password: password }).done(function(data) {
        outputData(data);
    });
};

let getUserById = (userid) => {
    $.get( "http://127.0.0.1:8080/api/users/" + userid, function(data) {
        outputData(data);
    });
};

let changePassword = (userid, password) => {
    $.put( "http://127.0.0.1:8080/api/users/" + userid, { password: password }).done(function(data) {
        outputData(data);
    });
};

let deleteUser = (userid) => {
    $.delete( "http://127.0.0.1:8080/api/users/" + userid, function(data) {
        outputData(data);
    });
};

let getUserTasks = (userid) => {
    $.get( "http://127.0.0.1:8080/api/users/" + userid + "/tasks", function(data) {
        outputData(data);
    });
};

let addUserTask = (userid, taskid) => {
    $.put( "http://127.0.0.1:8080/api/users/" + userid + "/tasks/" + taskid, { }).done(function(data) {
        outputData(data);
    });
};

let deleteUserTask = (userid, taskid) => {
    $.delete( "http://127.0.0.1:8080/api/users/" + userid + "/tasks/" + taskid, function(data) {
        outputData(data);
    });
};

let getTasks = () => {
    $.get( "http://127.0.0.1:8080/api/tasks", function(data) {
       outputData(data);
    });
};

let addTask = (title, details) => {
    $.post( "http://127.0.0.1:8080/api/tasks", { title: title, details: details }).done(function(data) {
       outputData(data);
    });
};

let getTaskById = (taskid) => {
    $.get( "http://127.0.0.1:8080/api/tasks/" + taskid, function(data) {
        outputData(data);
    });
};

let updateTask = (taskid, title, details, completed) => {
    $.put( "http://127.0.0.1:8080/api/tasks/" + taskid, { title: title, details: details, completed: completed }).done(function(data) {
        outputData(data);
    });
};

let deleteTask = (taskid) => {
    $.delete( "http://127.0.0.1:8080/api/tasks/" + taskid, function(data) {
        outputData(data);
    });
};