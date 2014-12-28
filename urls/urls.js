var urls = {} || urls;

urls = {
    functions : {
        loadUrl : function(app) {
            ulrs.loadUrlStudent(app);
            urls.loadUrlTeacher(app);
        },
        loadUrlStudent : function(app) {
            app.get('/student', function(req, res) {
                res.render('student/index');
            });

        },
        loadUrlTeacher : function(app) {
            app.get('/teacher', function(req, res) {
                res.render('teacher/index');
            });
        }
    }
}