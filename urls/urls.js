var urls = {} || urls;

urls = {
    functions : 
    {
        loadUrl : function(app) 
        {
            ulrs.loadUrlStudent(app);
            urls.loadUrlTeacher(app);
            urls.loadUrlSchedule(app)
        },
        loadUrlStudent : function(app) 
        {
            app.get('/student', function(req, res) {
                res.render('student/index');
            });

        },
        loadUrlTeacher : function(app) 
        {
            app.get('/teacher', function(req, res) {
                res.render('teacher/index');
            });
        },
        loadUrlSchedule : function(app)
        {
            app.get('/schedule', function(req, res)
            {
                res.render('schedule/index')
            });
        }
    }
}