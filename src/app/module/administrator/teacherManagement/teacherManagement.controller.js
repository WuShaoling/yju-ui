(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('teacherManagementCtrl', teacherManagementCtrl)
        .controller('addTeacherCtrl', addTeacherCtrl)
        .controller('editTeacherCtrl', editTeacherCtrl);

    teacherManagementCtrl.$inject = ['$scope', 'reqUrl', '$uibModal'];
    addTeacherCtrl.$inject = ['$scope', '$uibModalInstance'];
    editTeacherCtrl.$inject = ['$scope', '$uibModalInstance', 'teacher'];

    function teacherManagementCtrl($scope, reqUrl, $uibModal) {
        var vm = this;


        var teacherTable = $('#Teacher').DataTable({
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
                    "url": reqUrl + 'administrator/teacherManagement/teacher.json',
                    "type": 'GET',
                    beforeSend: function(xhr) {
                        // xhr.setRequestHeader('access_token', '1504751421487');
                    },
                    "dataSrc": function(data) {

                        data.data.map(function(item) {

                            if (item.gender == 0) {
                                item.gender = "男"
                            } else {
                                item.gender = "女"
                            }
                            return item;
                        });
                        // localStorageSrv.log('ajax data:'+JSON.stringify(data));
                        return data.data;
                    }
                },
                //设置列显示的值的 键名
                columns: [
                    { data: 'teacherId' },

                    { data: 'teacherName' },

                    { data: 'teacherPosition' },
                    { data: 'gender' },
                    { data: 'teacherContact' },
                    // { data: 'studentNum' },

                    // { data: 'brand' },
                    { data: '' }
                ],
                //自定义列，这里定义了最后一列的按钮
                columnDefs: [{
                    "targets": -1,
                    "data": null,
                    'className': "lsr-body-center",
                    "defaultContent": "<div class='btn-group'><button class='btn btn-info btn-outline editTeacher'>编辑</button><button class='btn btn-warning btn-outline resetPass'>重置密码</button><button class='btn btn-danger btn-outline deleteTeacher'>删除</button></div>"
                }],
                //自定义Button
                buttons: [{
                        text: '刷新',
                        action: function(e, dt, node, config) {
                            dt.ajax.reload();
                        }
                    },
                    {
                        text: '新增教师',
                        action: function(e, dt, node, config) {
                            addTeacher();
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

        // 用户表-手动绑定事件
        $('#Teacher tbody').on('click', '.editTeacher', function() {
            //获取当前行的某一列的数据
            //localStorageSrv.log(classTable.row($(this).parents('tr')).data().id);
            editTeacher(teacherTable.row($(this).parents('tr')).data());
        });
        $('#Teacher tbody').on('click', '.deleteTeacher', function() {
            deleteTeacher(teacherTable.row($(this).parents('tr')).data());
        });
        $('#Teacher tbody').on('click', '.resetPass', function() {
            resetPass(teacherTable.row($(this).parents('tr')).data());
        });

        var editTeacher = function(item) {
            console.log(item);

            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/editTeacherModal.html',
                controller: editTeacherCtrl,
                resolve: {
                    teacher: function() { return angular.copy(item); }
                }
            });


            modalInstance.result.then(function(result) {
                console.log(result);

            }, function(reason) {
                console.log(reason);
            });
        }
        var deleteTeacher = function(item) {
            console.log(item);

            swal({
                    title: "确定要删除吗？",
                    text: item.teacherName + "将被删除",
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
                            teacherTable.ajax.reload();
                        });
                        // toastr.success("删除成功!");
                    }
                });
        }
        var resetPass = function(item) {
            console.log(item);

            swal({
                    title: "确定要重置吗？",
                    text: "编号为" + item.teacherId + "的教师密码将被重置为【222222】",
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
        var addTeacher = function() {
            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/addTeacherModal.html',
                controller: addTeacherCtrl
            });


            modalInstance.result.then(function(result) {

            }, function(reason) {
                console.log(reason);
            });
        }
    }


    function addTeacherCtrl($scope, $uibModalInstance) {
        $scope.teacher = {}
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
            console.log($scope.teacher);
            $uibModalInstance.close();

        }

    }

    function editTeacherCtrl($scope, $uibModalInstance, teacher) {
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
        $scope.teacher = teacher;
        // $scope.teacher.gender = $scope.gender[1];

        console.log($scope.teacher)
        console.log($scope.teacher.gender);
        if ($scope.teacher.gender == "男") {
            $scope.teacher.gender = 0
        } else {
            $scope.teacher.gender = 1
        }
        $scope.ok = function() {
            $uibModalInstance.close();
        }
    }

})();