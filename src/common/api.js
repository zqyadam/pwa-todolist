let AV = require('leancloud-storage');
// hello appliction
const APP_ID = 'qNpVPquXEti01HpThDRcqiHl-gzGzoHsz';
const APP_KEY = 'KB8jNrxQz0i7WFCH9fYbXYtt';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
// localStorage.setItem('debug', 'leancloud*');
export let Todo = AV.Object.extend('Todo');

/* User Operate  */
export let requestLogin = function(loginParams) {
    return AV.User.logIn(loginParams.email, loginParams.password);
}
export let isLogedin = function() {
    console.log(AV.User.current());
    return AV.User.current() ? true : false;
}
export let getCurrentUser = function() {
    return AV.User.current();
}
export let logOut = function() {
    AV.User.logOut();
}
export let registeUser = function(userInfo) {
    var user = new AV.User();
    user.setUsername(userInfo.username);
    user.setPassword(userInfo.password);
    user.setEmail(userInfo.email);
    return user.signUp();
}



// start up->pullTodos->update local data
// data change -> saveToLocal -> commitTodos()
export let AddTodoItem = function(item) {
    var acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setWriteAccess(AV.User.current(), true);
    acl.setReadAccess(AV.User.current(), true);
    var todo = new Todo(item);
    todo.setACL(acl);
    todo.set('owner', getCurrentUser().id);
    return todo.save();
}

export let SaveTodoItem = function(item) {
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setWriteAccess(AV.User.current(), true);
    acl.setReadAccess(AV.User.current(), true);
    var todo = new Todo(item);
    todo.setACL(acl);
    return todo.save();
}

export let LoadServerTodos = function() {
    var uid = getCurrentUser().id;
    var ownerQuery = new AV.Query('Todo');
    ownerQuery.equalTo('owner', uid);
    var enableQuery = new AV.Query('Todo');
    enableQuery.equalTo('enable', true);
    return new AV.Query.and(ownerQuery, enableQuery).find();
}

export let addRole = function() {
    var roleACL = new AV.ACL();
    roleACL.setPublicReadAccess(false);
    roleACL.setPublicWriteAccess(false);

    roleACL.setWriteAccess(AV.User.current(), true);

    var UserRole = new AV.Role('User', roleACL);
    UserRole.save().then(function(role) {
        console.log(role);
    }, function(err) {
        console.log(err);
    })
}




export let codeToMessage = function(code) {
    switch (code) {
        case 202:
            return '用户名已经被占用';
        case 203:
            return '电子邮箱地址已经被占用';
        case 204:
            return '没有提供电子邮箱地址';
        case 205:
            return '找不到电子邮箱地址对应的用户';
        case 206:
            return '没有提供 session';
        case 207:
            return '只能通过注册创建用户，不允许第三方登录';
        case 208:
            return '第三方帐号已经绑定到一个用户，不可绑定到其他用户。';
        case 210:
            return '用户名和密码不匹配。';
        case 211:
            return "用户不存在，立即注册一个吧~";
        case 212:
            return '请提供手机号码。';
        case 213:
            return '手机号码对应的用户不存在。';
        case 214:
            return ' 手机号码已经被注册。';
        case 215:
            return ' 未验证的手机号码。';
        case 216:
            return '未验证的邮箱地址。';
        case 217:
            return '无效的用户名，不允许空白用户名。';
        case 218:
            return '无效的密码，不允许空白密码。';
        case 219:
            return '登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码。';
        case 250:
            return '连接的第三方账户没有返回用户唯一标示 id';
        case 251:
            return '无效的账户连接。';
        case 252:
            return '无效的微信授权信息。';
        case 217:
            return '无效的用户名，不允许空白用户名。';
        default:
            return "未定义的错误码。";
    }
}
