(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('addCourseCtrl', addCourseCtrl)
        .controller('courseManagementCtrl', courseManagementCtrl);

    addCourseCtrl.$inject = ['$scope', '$uibModalInstance'];

    courseManagementCtrl.$inject = ['$scope', 'reqUrl', '$uibModal', '$state'];

    function courseManagementCtrl($scope, reqUrl, $uibModal, $state) {
        var vm = this;

        var courseTable = $('#Course').DataTable({
                //控制各个控件的位置
                dom: "<'row datatable-row'<'col-sm-6'B><'col-sm-6'f>>" +
                    "<'row datatable-row'<'col-sm-12'tr>>" +
                    "<'row datatable-row'<'col-sm-5'i><'col-sm-7'p>>",
                //设置语言，可以直接修改显示的文字
                language: {
                    'url': '//cdn.datatables.net/plug-ins/1.10.12/i18n/Chinese.json'
                },
                //数据源
                ajax: {
                    "url": 'http://xlab.rainlf.com:8080/course/all',
                    "type": 'GET',
                    beforeSend: function(xhr) {
                        // xhr.setRequestHeader('access_token', '1504751421487');
                    },
                    "dataSrc": function(data) {
                        console.log(data);
                        // data.data.map(function(item) {

                        //     console.log(item);
                        //     if (item.role == 0) {
                        //         item.role = "普通用户"
                        //     } else {
                        //         item.role = "超级管理员"
                        //     }
                        //     return item;
                        // });
                        // localStorageSrv.log('ajax data:'+JSON.stringify(data));
                        return data.data;
                    }
                },
                //设置列显示的值的 键名
                columns: [
                    { data: 'courseId' },

                    { data: 'courseName' },

                    { data: 'courseDes' },
                    { data: 'teacherName' },
                    { data: 'teacherEmail' },
                    // { data: 'studentNum' },

                    // { data: 'brand' },
                    { data: '' }
                ],
                //自定义列，这里定义了最后一列的按钮
                columnDefs: [{
                    "targets": -1,
                    "data": null,
                    'className': "lsr-body-center",
                    "defaultContent": "<div class='btn-group'><button class='btn btn-info btn-outline courseMaintain'>课程实验维护</button><button class='btn btn-danger btn-outline deleteCourse'>删除课程</button></div>"
                }],
                //自定义Button
                buttons: [{
                        text: '刷新',
                        action: function(e, dt, node, config) {
                            dt.ajax.reload();
                        }
                    },
                    {
                        text: '新增课程',
                        action: function(e, dt, node, config) {
                            addCourse();
                            dt.ajax.reload();
                        }
                    }
                ],
                //顾名思义
                responsive: true
            })
            .on('xhr.dt', function(e, settings, json, xhr) {
                //localStorageSrv.log("e-------------------->" + JSON.stringify(e));
                // localStorageSrv.log("settings-------------------->" + JSON.stringify(settings));
                // localStorageSrv.log("json-------------------->" + JSON.stringify(json));
                //localStorageSrv.log("xhr-------------------->" + JSON.stringify(xhr.status));
                //angular-http-auth插件无法捕捉datatable内ajax发出请求后回复头中的status，所以这里单独捕捉
                if (xhr.status == 401) {
                    // $rootScope.$broadcast('event:auth-loginRequire');
                    //localStorageSrv.log('401xhr');
                }
            });


        $('#Course tbody').on('click', '.courseMaintain', function() {
            //获取当前行的某一列的数据
            //localStorageSrv.log(classTable.row($(this).parents('tr')).data().id);
            courseMaintain(courseTable.row($(this).parents('tr')).data());
        });
        $('#Course tbody').on('click', '.deleteCourse', function() {
            deleteCourse(courseTable.row($(this).parents('tr')).data());
        });

        var addCourse = function() {
            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/addCourseModal.html',
                controller: addCourseCtrl,

            });
            modalInstance.result.then(function(result) {}, function(reason) {
                console.log(reason);
            });
        }
        var courseMaintain = function(item) {
            $state.go('index.courseMaintainence');
        }
        var deleteCourse = function(item) {
            console.log(item);
            swal({
                    title: "确定要删除吗？",
                    text: item.teacherName + "的【" + item.courseName + "】课程将被删除",
                    type: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    closeOnConfirm: false,
                    cancelButtonText: "取消",
                    closeOnCancel: true
                },
                function(isConfirm) {

                    if (isConfirm) {

                        swal({
                            title: "删除成功咯",
                            // text: "项目【" + projectName + "】已删除咯",
                            type: "success",
                            showCancelButton: false,
                            // confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确定",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        }, function() {
                            courseTable.ajax.reload();
                        });
                        // toastr.success("删除成功!");
                    }
                });
        }
    }

    function addCourseCtrl($scope, $uibModalInstance) {
        $scope.course = {};

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {
            $scope.course.teacher = $scope.person;
            console.log($scope.course);

            $uibModalInstance.close();
        }


        $scope.person = {};
        $scope.people = [
            { name: '王老师', email: 'adam@email.com', id: 1352980, country: 'United States' },
            { name: '张老师', email: 'amalie@email.com', id: 1452120, country: 'Argentina' },
            { name: '邱老师', email: 'estefania@email.com', id: 1131280, country: 'Argentina' },
            // { name: 'Adrian', email: 'adrian@email.com', id: 21, country: 'Ecuador' },
            // { name: 'Wladimir', email: 'wladimir@email.com', id: 30, country: 'Ecuador' },
            // { name: 'Samantha', email: 'samantha@email.com', id: 30, country: 'United States' },
            // { name: 'Nicole', email: 'nicole@email.com', id: 43, country: 'Colombia' },
            // { name: 'Natasha', email: 'natasha@email.com', id: 54, country: 'Ecuador' },
            // { name: 'Michael', email: 'michael@email.com', id: 15, country: 'Colombia' },
            // { name: 'Nicolás', email: 'nicolas@email.com', id: 43, country: 'Colombia' }
        ];
    }


})();