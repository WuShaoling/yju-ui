(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('classDetailCtrl', classDetailCtrl)
        .controller('editStudentCtrl', editStudentCtrl)
        .controller('addStudentCtrl', addStudentCtrl);

    classDetailCtrl.$inject = ['$scope', 'reqUrl', '$uibModal'];
    addStudentCtrl.$inject = ['$scope', '$uibModalInstance'];
    editStudentCtrl.$inject = ['$scope', '$uibModalInstance', 'student'];

    function classDetailCtrl($scope, reqUrl, $uibModal) {
        var vm = this;
        var studentTable = $('#Student').DataTable({
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
                    "url": reqUrl + 'administrator/classDetail/student.json',
                    "type": 'GET',
                    beforeSend: function(xhr) {
                        // xhr.setRequestHeader('access_token', '1504751421487');
                    },
                    "dataSrc": function(data) {

                        data.data.map(function(item) {

                            console.log(item);
                            if (item.gender == "1") {
                                item.gender = "女"
                            } else {
                                item.gender = "男"
                            }
                            return item;
                        });
                        // localStorageSrv.log('ajax data:'+JSON.stringify(data));
                        return data.data;
                    }
                },
                //设置列显示的值的 键名
                columns: [

                    { data: 'studentId' },
                    { data: 'name' },
                    { data: 'gender' },


                    { data: '' }
                ],
                //自定义列，这里定义了最后一列的按钮
                columnDefs: [{
                    "targets": -1,
                    "data": null,
                    'className': "lsr-body-center",
                    "defaultContent": "<div class='btn-group'><button class='btn btn-info btn-outline editStudent'>修改学生信息</button><button class='btn btn-warning btn-outline resetPass'>重置密码</button><button class='btn btn-danger btn-outline deleteStudent'>删除</button></div>"
                }],
                //自定义Button
                buttons: [{
                        text: '刷新',
                        action: function(e, dt, node, config) {
                            dt.ajax.reload();
                        }
                    },
                    {
                        text: '导入学生名单',
                        action: function(e, dt, node, config) {
                            batchAddStudent();
                            dt.ajax.reload();
                        }
                    }, {
                        text: '添加学生',
                        action: function(e, dt, node, config) {
                            addStudent();
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

        $('#Student tbody').on('click', '.editStudent', function() {
            //获取当前行的某一列的数据
            //localStorageSrv.log(classTable.row($(this).parents('tr')).data().id);
            editStudent(studentTable.row($(this).parents('tr')).data());
        });
        $('#Student tbody').on('click', '.resetPass', function() {
            resetPass(studentTable.row($(this).parents('tr')).data());
        });
        $('#Student tbody').on('click', '.deleteStudent', function() {
            deleteStudent(studentTable.row($(this).parents('tr')).data());
        });

        var editStudent = function(item) {
            console.log(item);

            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/editStudentModal.html',
                controller: editStudentCtrl,
                resolve: {
                    student: function() { return angular.copy(item); }
                }
            });


            modalInstance.result.then(function(result) {
                console.log(result);

            }, function(reason) {
                console.log(reason);
            });
        }
        var addStudent = function() {
            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/addStudentModal.html',
                controller: addStudentCtrl
            });


            modalInstance.result.then(function(result) {

            }, function(reason) {
                console.log(reason);
            });
        }
        var resetPass = function(item) {
            console.log(item);

            swal({
                    title: "确定要重置吗？",
                    text: "编号为" + item.studentId + "的学生密码将被重置为【222222】",
                    type: "warning",
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
                            title: "重置成功咯",
                            // text: "项目【" + projectName + "】已删除咯",
                            type: "success",
                            showCancelButton: false,
                            // confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确定",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        }, function() {

                        });
                        // toastr.success("删除成功!");
                    }
                });
        }
        var deleteStudent = function(item) {
            console.log(item);

            swal({
                    title: "确定要删除吗？",
                    text: item.studentId + "将被删除",
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

                        });
                        // toastr.success("删除成功!");
                    }
                });
        }
    }


    function addStudentCtrl($scope, $uibModalInstance) {
        $scope.student = {}
        $scope.gender = [{
            label: "男",
            value: 0,
        }, {
            label: "女",
            value: 1,
        }]
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {
            console.log($scope.student);
            $uibModalInstance.close();

        }

    }

    function editStudentCtrl($scope, $uibModalInstance, student) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.gender = [{
            "label": "男",
            "value": 0,
        }, {
            "label": "女",
            "value": 1,
        }]
        $scope.student = student;
        // $scope.student.gender = $scope.gender[1];

        console.log($scope.student)
        console.log($scope.student.gender);
        if ($scope.student.gender == "男") {
            $scope.student.gender = 0
        } else {
            $scope.student.gender = 1
        }
        $scope.ok = function() {
            $uibModalInstance.close();
        }
    }
})();