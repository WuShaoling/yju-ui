(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('classManagementCtrl', classManagementCtrl)
        .controller('editClassCtrl', editClassCtrl)
        .controller('addClassCtrl', addClassCtrl);


    classManagementCtrl.$inject = ['$scope', 'reqUrl', '$state', '$uibModal'];
    editClassCtrl.$inject = ['$scope', '$uibModalInstance', 'classtemp'];
    addClassCtrl.$inject = ['$scope', '$uibModalInstance'];

    function classManagementCtrl($scope, reqUrl, $state, $uibModal) {
        var vm = this;

        $scope.classList = []

        var classTable = $('#Class').DataTable({
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
                    "url": 'http://xlab.rainlf.com:8080/class/all',
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
                    { data: 'classId' },
                    { data: 'className' },
                    { data: 'courseName' },
                    { data: 'term' },
                    { data: 'teacherName' },
                    { data: 'teacherMail' },
                    { data: 'studentNum' },

                    // { data: 'brand' },
                    { data: '' }
                ],
                //自定义列，这里定义了最后一列的按钮
                columnDefs: [{
                    "targets": -1,
                    "data": null,
                    'className': "lsr-body-center",
                    "defaultContent": "<div class='btn-group'><button class='btn btn-info btn-outline checkClass'>学生管理</button><button class='btn btn-info btn-outline editClass'>更新选课</button><button class='btn btn-info btn-outline homework'>作业管理</button><button class='btn btn-danger btn-outline deleteClass'>删除班级</button></div>"
                }],
                //自定义Button
                buttons: [{
                        text: '刷新',
                        action: function(e, dt, node, config) {
                            dt.ajax.reload();
                        }
                    },
                    {
                        text: '新增选课',
                        action: function(e, dt, node, config) {
                            addClass();
                            dt.ajax.reload();
                        }
                    }
                ],
                //顾名思义
                responsive: true
            })
            .on('xhr.dt', function(e, settings, json, xhr) {

                if (xhr.status == 401) {

                }
            });

        // 用户表-手动绑定事件
        $('#Class tbody').on('click', '.editClass', function() {
            //获取当前行的某一列的数据
            //localStorageSrv.log(classTable.row($(this).parents('tr')).data().id);
            editClass(classTable.row($(this).parents('tr')).data());
        });
        $('#Class tbody').on('click', '.checkClass', function() {
            //获取当前行的某一列的数据
            //localStorageSrv.log(classTable.row($(this).parents('tr')).data().id);
            checkClass(classTable.row($(this).parents('tr')).data());
        });
        $('#Class tbody').on('click', '.deleteClass', function() {
            deleteClass(classTable.row($(this).parents('tr')).data());
        });
        $('#Class tbody').on('click', '.homework', function() {
            homework(classTable.row($(this).parents('tr')).data());
        });
        $('#Class tbody').on('click', '.addClass', function() {
            addClass(classTable.row($(this).parents('tr')).data());
        });
        var checkClass = function() {
            $state.go('index.classDetail')
        }
        var addClass = function() {
            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/addClassModal.html',
                controller: 'addClassCtrl'
            });


            modalInstance.result.then(function(result) {

            }, function(reason) {
                console.log(reason);
            });
        }

        var homework = function(item) {
            $state.go('index.homeworkManagement')
        }

        var editClass = function(item) {
            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/editClassModal.html',
                controller: 'editClassCtrl',
                resolve: {
                    classtemp: function() { return angular.copy(item); }
                }
            });


            modalInstance.result.then(function(result) {

            }, function(reason) {
                console.log(reason);
            });
        }
        var deleteClass = function(item) {
            swal({
                    title: "确定要删除吗？",
                    text: "【" + item.courseName + "课的" + item.className + "】将被删除",
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

    function addClassCtrl($scope, $uibModalInstance) {
        $scope.class = {}

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {
            console.log($scope.class);
            $uibModalInstance.close();

        }
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
        $scope.semesters = [{
                label: "2017第一学期",
                value: "2017第一学期",
            },
            {
                label: "2017第二学期",
                value: "2017第二学期",
            }
        ]


        $scope.person = {}

    }

    function editClassCtrl($scope, $uibModalInstance, classtemp) {
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
        $scope.class = classtemp;
        // $scope.class.gender = $scope.gender[1];

        console.log($scope.class)
        console.log($scope.class.gender);
        if ($scope.class.gender == "男") {
            $scope.class.gender = 0
        } else {
            $scope.class.gender = 1
        }
        $scope.ok = function() {
            $uibModalInstance.close();
        }

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
        $scope.semesters = [{
                label: "2017第一学期",
                value: "2017第一学期",
            },
            {
                label: "2017第二学期",
                value: "2017第二学期",
            }
        ]


        $scope.person = {}
        $scope.person['selected'] = $scope.people[0];

    }
})();