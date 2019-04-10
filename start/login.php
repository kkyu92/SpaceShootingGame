<html>
<head>
    <title>
        Welcome!!
    </title>
</head>
<body bgcolor=black>
<center>
    <font color=white size=4>Hi<br>Welcome to MyPage!
        <br><br>

        <form name=frm1 action="login_ok.php" method=post>
            <table cellpadding=2>
                <tr>
                    <td colspan=2><font color=white>LOGIN
                    </td>
                </tr>
                <tr>
                    <td><font color=white>ID</td>
                    <td><input type=text name="id" size=10></td>
                </tr>
                <tr>
                    <td><font color=white>PW</td>
                    <td><input type=password name="pw"></td>
                </tr>
                <tr>
                    <td colspan=2 align=center><input type=submit value="Login">&nbsp;&nbsp;<input type=button value="join" onclick="location.href='join.php'">
                    </td>
                </tr>
            </table>
        </form>
</center>
</body>
</html>