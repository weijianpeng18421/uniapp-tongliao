import SQL_CONTANTS from '../constant/sqlConstant.js'
function openCommDB(success,fail) {  
    plus.sqlite.openDatabase({  
        name: SQL_CONTANTS.sqlName,  
        path: SQL_CONTANTS.path,  
        success: function(e) {  
            // plus.nativeUI.alert('打开数据库成功');  
            success(e)  
        },  
        fail: function(e) {  
            // plus.nativeUI.alert("打开数据库失败");  
            fail(e);  
        }  
    })  
}  
function isOpenDatabase(){
	return plus.sqlite.isOpenDatabase({
		name: SQL_CONTANTS.sqlName,
		path: SQL_CONTANTS.path
	})
}
function executeSQL(sql, success,fail) {  
    plus.sqlite.executeSql({  
        name: SQL_CONTANTS.sqlName,  
        sql: sql,  
        success: function(e) {  
            success(e);  
        },  
        fail: function(e) {   
            fail(e);  
        }  
    })  
}  
function selectSQL(sql, success,fail) {  
    plus.sqlite.selectSql({  
        name: SQL_CONTANTS.sqlName,  
        sql: sql,  
        success: function(e) {  
            success(e);  
        },  
        fail: function(e) {   
            fail(e);  
        }  
    })  
}
export{  
	openCommDB,  
	executeSQL,
    isOpenDatabase,
	selectSQL
}