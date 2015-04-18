var CarouselCourse= CarouselCourse || {};

CarouselCourse = {

    setInfoCourse: function(course) {
        var times = "hora de inicio:" + course.startTime + "-hora fin:" + course.endTime,
            datesRange= " fecha de inicio:" + course.startDate + "-fecha de fin" + course.endDate;
        $('#title').text(course.name.toUpperCase());
        $('#times').text(times);
        $('#dates').text(datesRange);
    },
    next: function(courses) {
        //debugger;
        window.index = window.index +1 >= courses.length? 0 : window.index + 1;
        this.setInfoCourse(courses[window.index]);
    },
    previous: function(courses) {
        window.index = window.index -1 < 0? courses.length -1 : window.index - 1;
        this.setInfoCourse(courses[window.index]);
    }
}