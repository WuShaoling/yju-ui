(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('classManagementCtrl', classManagementCtrl)
        .controller('editClassCtrl', editClassCtrl)
        .controller('addClassCtrl', addClassCtrl);


    classManagementCtrl.$inject = ['$scope', 'reqUrl', '$state', '$uibModal', 'classManagementSrv'];
    editClassCtrl.$inject = ['$scope', '$uibModalInstance', 'classtemp', 'courseManagementSrv', 'semesterSrv', 'classManagementSrv', 'teacherManageSrv'];
    addClassCtrl.$inject = ['$scope', '$uibModalInstance', 'courseManagementSrv', 'classManagementSrv', 'semesterSrv', 'teacherManageSrv'];

    function classManagementCtrl($scope, reqUrl, $state, $uibModal, classManagementSrv) {
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
                    // "url": 'http://xlab.rainlf.com:8080/class/all',
                    "url": reqUrl + '/admin/class/all',

                    "type": 'GET',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + (localStorage['token'] ? localStorage['token'] : ''));
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
                        return data.data.classInfoList;
                    }
                },
                //设置列显示的值的 键名
                columns: [
                    { data: 'classId' },
                    { data: 'className' },

                    { data: 'courseName' },
                    // { data: 'courseDes' },

                    { data: 'term' },
                    { data: 'teacherName' },
                    { data: 'teacherContact' },
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
                            classTable.ajax.reload();
                        }
                    },
                    {
                        text: '新增选课',
                        action: function(e, dt, node, config) {
                            addClass();

                        }
                    }
                ],
                //顾名思义
                responsive: true
            })
            .on('xhr.dt', function(e, settings, json, xhr) {

                if (xhr.status == 200) {
                    console.log(xhr)
                    if (xhr.responseJSON.errorCode == 45) {
                        toastr.error("登录超时！");
                        localStorage['requireLogin'] = true
                        $state.go("index.main", null, { reload: true })
                    } else if (xhr.responseJSON.errorCode == 46) {
                        toastr.error("请重新登录！");
                        localStorage['requireLogin'] = true
                        $state.go("index.main", null, { reload: true })
                    } else if (xhr.responseJSON.errorCode != 0) {
                        toastr.error(xhr.responseJSON.message);
                    }
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
        var checkClass = function(item) {
            $state.go('index.classDetail', { classId: item.classId })
        }
        var addClass = function() {
            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/addClassModal.html',
                controller: 'addClassCtrl'
            });


            modalInstance.result.then(function(result) {
                if (result) {
                    classTable.ajax.reload();

                }
            });
        }

        var homework = function(item) {
            $state.go('index.homeworkManagement', { classId: item.classId })
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
                if (result) {
                    classTable.ajax.reload();

                }
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

                        classManagementSrv.deleteclass().save({
                                classId: item.classId
                            }, function(response) {
                                console.log(response);
                                if (response.errorCode == 0) {
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
                                        classTable.ajax.reload();
                                    });
                                }
                            },
                            function(error) {
                                toastr.error("删除失败");
                            })
                    }
                });
        }
    }

    function addClassCtrl($scope, $uibModalInstance, courseManagementSrv, classManagementSrv, semesterSrv, teacherManageSrv) {
        $scope.class = {}

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {
            console.log($scope.class);
            if (!$scope.class.className) {
                toastr.error("班级名称不能为空");
                return;
            }
            if (!$scope.class.semester) {
                toastr.error("学期不能为空");
                return;
            }
            if (!$scope.class.course) {
                toastr.error("课程不能为空");
                return;
            }
            if (!$scope.class.teacherId) {
                toastr.error("授课教师不能为空");
                return;
            }
            classManagementSrv.addclass().save({
                "className": $scope.class.className,
                "courseId": $scope.class.course.id,
                "termId": $scope.class.semester.id,
                "teacherId": $scope.class.teacherId
            }, function(response) {
                console.log(response)
                if (response.errorCode == 0) {
                    toastr.success("添加成功")
                    $uibModalInstance.close(1);
                } else {
                    toastr.error(response.message)

                }
            }, function(error) {
                toastr.error("添加失败")

            })


        }
        semesterSrv.getAllSemester().get(function(response) {
                console.log(response)
                if (response.errorCode == 0) {
                    $scope.semesters = response.data.semesterList
                } else {
                    toastr.error(response.message)
                }
            },
            function(error) {
                toastr.error("获取学期信息失败，请稍后再试")
            })
        courseManagementSrv.getAllCourse().get(function(response) {
                console.log(response)
                if (response.errorCode == 0) {
                    $scope.courses = response.data.courseInfoList
                } else {
                    toastr.error(response.message)

                }
            },
            function(error) {
                toastr.error("获取课程信息失败，请稍后再试")
            })

        teacherManageSrv.getAllTeachers().get().$promise.then(
            function(response) {
                console.log(response);
                if (response.errorCode == 0) {
                    $scope.teachers = response.data.teacherInfoList;
                } else {
                    toastr.error(response.message)
                }
            },
            function(error) {
                console.log("获取教师列表失败，请稍后再试");
            }
        )

        $scope.teachers = []
    }

    function editClassCtrl($scope, $uibModalInstance, classtemp, courseManagementSrv, semesterSrv, classManagementSrv, teacherManageSrv) {
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
        console.log($scope.class);
        semesterSrv.getAllSemester().get(function(response) {
                console.log(response)
                if (response.errorCode == 0) {
                    $scope.semesters = response.data.semesterList;
                    for (var i in $scope.semesters) {
                        if ($scope.class.term == $scope.semesters[i].description) {
                            $scope.class.semester = $scope.semesters[i]
                            break;
                        }
                    }
                } else {
                    toastr.error("获取学期信息失败，请稍后再试")

                }
            },
            function(error) {
                toastr.error("获取学期信息失败，请稍后再试")
            })
        courseManagementSrv.getAllCourse().get(function(response) {
                console.log(response)
                if (response.errorCode == 0) {
                    $scope.courses = response.data.courseInfoList
                    for (var i in $scope.courses) {
                        if ($scope.class.courseId == $scope.courses[i].id) {
                            $scope.class.course = $scope.courses[i]
                            break;
                        }
                    }
                } else {
                    toastr.error("获取课程信息失败，请稍后再试")

                }
            },
            function(error) {
                toastr.error("获取课程信息失败，请稍后再试")
            })

        teacherManageSrv.getAllTeachers().get().$promise.then(
            function(response) {
                console.log(response);
                if (response.errorCode == 0) {
                    $scope.teachers = response.data.teacherInfoList;
                } else {
                    toastr.error(response.message)
                }
            },
            function(error) {
                console.log("获取教师列表失败，请稍后再试");
            }
        )

        $scope.teachers = []

        $scope.ok = function() {
            console.log($scope.class)
            if (!$scope.class.className) {
                toastr.error("班级名称不能为空");
                return;
            }
            if (!$scope.class.semester) {
                toastr.error("学期不能为空");
                return;
            }
            if (!$scope.class.course) {
                toastr.error("课程不能为空");
                return;
            }
            if (!$scope.class.teacherId) {
                toastr.error("授课教师不能为空");
                return;
            }
            classManagementSrv.editclass().save({
                "classId": $scope.class.classId,
                "className": $scope.class.className,
                "courseId": $scope.class.course.id,
                "termId": $scope.class.semester.id,
                "teacherId": $scope.class.teacher.id
            }, function(response) {
                console.log(response)
                if (response.errorCode == 0) {
                    toastr.success("更新成功")
                    $uibModalInstance.close(1);
                } else {
                    toastr.error(response.message)

                }
            }, function(error) {
                toastr.error("更新失败")

            })
        }

    }
})();