(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('classDetailCtrl', classDetailCtrl)
        .controller('editStudentCtrl', editStudentCtrl)
        .controller('addStudentCtrl', addStudentCtrl)
        .controller('batchAddStudentCtrl', batchAddStudentCtrl);

    classDetailCtrl.$inject = ['$scope', 'reqUrl', '$uibModal', '$stateParams', 'commonSrv', 'classManagementSrv'];
    addStudentCtrl.$inject = ['$scope', '$uibModalInstance', 'classManagementSrv', '$stateParams'];
    editStudentCtrl.$inject = ['$scope', '$uibModalInstance', 'student', 'classManagementSrv'];
    batchAddStudentCtrl.$inject = ['$scope', '$uibModalInstance', '$stateParams', 'reqUrl', 'usSpinnerService'];

    function batchAddStudentCtrl($scope, $uibModalInstance, $stateParams, reqUrl, usSpinnerService) {
        console.log($stateParams.classId);
        $scope.classId = $stateParams.classId;
        $scope.token = 'Bearer ' + (localStorage['token'] ? localStorage['token'] : '')
        $scope.close = function() {
            $uibModalInstance.close('dismiss')
        }

        $scope.ok = function() {
            $scope.disableUpload = true;
            usSpinnerService.spin('upload-spinner')
            console.log($scope.selectedFile);
            var formdata = new FormData();
            formdata.append('file', $scope.selectedFile)
            $.ajax({
                type: 'POST',
                url: $scope.importURL + '?classId=' + $scope.classId,
                dataType: 'json',
                beforeSend: function(xhr) {
                    // xhr.setRequestHeader('access_token', '1504751421487');
                    xhr.setRequestHeader('Authorization', 'Bearer ' + (localStorage['token'] ? localStorage['token'] : ''));
                },
                processData: false, // Dont process the files
                contentType: false,
                data: formdata,
                success: function(res) {
                    console.log(res)
                    if (res.errorCode == 0) {
                        usSpinnerService.stop('upload-teacher');

                        if (res.data.failure == 0) {
                            $uibModalInstance.close(1);
                            toastr.success('上传成功');

                        } else {
                            $scope.failureList = res.data.failureReasonList
                        }
                        // $scope.markdownUrl = res.data;
                        // $.get($scope.markdownUrl + '', function(result) {
                        //     console.log(result)
                        //     if (result == null) {
                        //         return
                        //     }
                        //     $scope.text = result;
                        //     console.log($scope.text);

                        //     $scope.html = converter.makeHtml($scope.text);
                        //     // $timeout(function() {
                        //     //     console.log($('#ht').height())
                        //     //     $('#or').height($('#ht').height());
                        //     // })

                        //     // console.log(result.label_type)

                        // });
                        // qiniuImage = qiniuURL + res.fileName;
                        // $scope.imageSrc = qiniuURL + res.fileName;
                        // $scope.isUpload = true;
                        $scope.$apply();
                    } else if (res.errorCode == 45) {
                        toastr.error("登录超时！");
                        usSpinnerService.stop('upload-teacher');

                        $rootScope.$broadcast('ok', 0);
                    } else if (res.errorCode == 46) {
                        toastr.error("请重新登录！");
                        usSpinnerService.stop('upload-teacher');

                        $rootScope.$broadcast('ok', 0)
                    } else {
                        toastr.error(res.message);
                        usSpinnerService.stop('upload-teacher');

                    }
                }
            });

        }
        $scope.importURL = reqUrl + '/admin/class/student/batchCreation';

        // $scope.trustSrc = function(src) {
        //     return $sce.trustAsResourceUrl(src);
        // }
    }

    function classDetailCtrl($scope, reqUrl, $uibModal, $stateParams, commonSrv, classManagementSrv) {

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
                    "url": reqUrl + '/admin/class/' + $stateParams.classId + '/students/all',
                    "type": 'GET',
                    beforeSend: function(xhr) {
                        // xhr.setRequestHeader('access_token', '1504751421487');
                        xhr.setRequestHeader('Authorization', 'Bearer ' + (localStorage['token'] ? localStorage['token'] : ''));

                    },
                    "dataSrc": function(data) {

                        data.data.studentList.map(function(item) {


                            if (item.gender == "2") {
                                item.gender = "女"
                            } else {
                                item.gender = "男"
                            }
                            return item;
                        });
                        // localStorageSrv.log('ajax data:'+JSON.stringify(data));
                        return data.data.studentList;
                    }
                },
                //设置列显示的值的 键名
                columns: [

                    { data: 'studentNo' },
                    { data: 'studentName' },
                    { data: 'gender' },


                    { data: '' }
                ],
                //自定义列，这里定义了最后一列的按钮
                columnDefs: [{
                    "targets": -1,
                    "data": null,
                    'className': "lsr-body-center",
                    "defaultContent": "<div class='btn-group'><button class='btn btn-warning btn-outline resetPass'>重置密码</button><button class='btn btn-danger btn-outline deleteStudent'>删除</button></div>"

                    // "defaultContent": "<div class='btn-group'><button class='btn btn-info btn-outline editStudent'>修改学生信息</button><button class='btn btn-warning btn-outline resetPass'>重置密码</button><button class='btn btn-danger btn-outline deleteStudent'>删除</button></div>"
                }],
                //自定义Button
                buttons: [{
                        text: '刷新',
                        action: function(e, dt, node, config) {
                            studentTable.ajax.reload();
                        }
                    },
                    {
                        text: '导入学生名单',
                        action: function(e, dt, node, config) {
                            batchAddStudent();
                        }
                    }, {
                        text: '添加学生',
                        action: function(e, dt, node, config) {
                            addStudent();
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
                        $rootScope.$broadcast('ok', 0);
                    } else if (xhr.responseJSON.errorCode == 46) {
                        toastr.error("请重新登录！");
                        $rootScope.$broadcast('ok', 0)
                    } else if (xhr.responseJSON.errorCode != 0) {
                        toastr.error(xhr.responseJSON.message);
                    }
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


        var batchAddStudent = function() {

            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/batchAddStudentModal.html',
                controller: 'batchAddStudentCtrl',
                // resolve: {
                //     classId: function() { return angular.copy(item); }
                // }
            });

            modalInstance.result.then(function(result) {
                if (result) {
                    studentTable.ajax.reload();
                }

            });
        }
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
                if (result) {
                    studentTable.ajax.reload();

                }

            });
        }
        var addStudent = function() {
            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/addStudentModal.html',
                controller: addStudentCtrl
            });


            modalInstance.result.then(function(result) {
                if (result) {
                    studentTable.ajax.reload();

                }
            });
        }
        var resetPass = function(item) {
            console.log(item);

            swal({
                    title: "确定要重置吗？",
                    text: "编号为" + item.studentId + "的学生密码将被重置为【12345678】",
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

                        commonSrv.resetPass().save({
                                    userId: item.id
                                }, function(response) {
                                    console.log(response)
                                    if (response.errorCode == 0) {
                                        swal({
                                            title: "重置成功咯",
                                            // text: "项目【" + projectName + "】已删除咯",
                                            type: "success",
                                            showCancelButton: false,
                                            // confirmButtonColor: "#DD6B55",
                                            confirmButtonText: "确定",
                                            closeOnConfirm: true,
                                            closeOnCancel: true
                                        });
                                    } else {
                                        toastr.error(response.message);

                                    }
                                },
                                function(error) {
                                    toastr.error("重置失败")
                                })
                            // toastr.success("删除成功!");
                    }
                });
        }
        var deleteStudent = function(item) {
            console.log(item);

            swal({
                    title: "确定要删除吗？",
                    text: item.studentNo + "将被删除",
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
                        classManagementSrv.deleteStudent().save({
                            "classId": parseInt($stateParams.classId),
                            "studentId": item.id
                        }, function(response) {
                            console.log(response)
                            if (response.errorCode == 0) {
                                studentTable.ajax.reload()

                                swal({
                                    title: "删除成功咯",
                                    // text: "项目【" + projectName + "】已删除咯",
                                    type: "success",
                                    showCancelButton: false,
                                    // confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "确定",
                                    closeOnConfirm: true,
                                    closeOnCancel: true
                                });
                            } else {
                                toastr.error(response.message)
                            }
                        }, function(error) {
                            toastr.error("删除失败，请稍后再试")
                        })

                        // toastr.success("删除成功!");
                    }
                });
        }
    }


    function addStudentCtrl($scope, $uibModalInstance, classManagementSrv, $stateParams) {
        $scope.student = {}
        $scope.gender = [{
            label: "男",
            value: 1,
        }, {
            label: "女",
            value: 2,
        }]
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        console.log($stateParams)
        $scope.ok = function() {
            console.log($scope.student)
            if (!$scope.student.studentId) {
                toastr.error("学生学号不能为空");
                return;
            }
            if (!$scope.student.name) {
                toastr.error("学生姓名不能为空");
                return;
            }

            classManagementSrv.addStudent().save({
                "classId": $stateParams.classId,
                "gender": $scope.student.gender,
                "override": false,
                "studentName": $scope.student.name,
                "studentNo": $scope.student.studentId
            }, function(response) {
                console.log(response);
                if (response.errorCode == 0) {
                    toastr.success("添加成功");
                    $uibModalInstance.close(1);
                } else if (response.errorCode == 29) {

                    swal({
                            title: "注意",
                            text: response.message,
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确定",
                            closeOnConfirm: true,
                            cancelButtonText: "取消",
                            closeOnCancel: true
                        },
                        function(isConfirm) {

                            if (isConfirm) {
                                classManagementSrv.addStudent().save({
                                    "classId": $stateParams.classId,
                                    "gender": $scope.student.gender,
                                    "override": true,
                                    "studentName": $scope.student.name,
                                    "studentNo": $scope.student.studentId
                                }, function(success) {
                                    console.log(success);
                                    if (success.errorCode == 0) {
                                        toastr.success("添加成功");
                                        $uibModalInstance.close(1);
                                    } else {
                                        toastr.error(success.message);
                                    }
                                }, function() {
                                    toastr.error("添加失败")
                                })

                                // toastr.success("删除成功!");
                            }
                        });
                } else {
                    toastr.error(response.message);
                }
            }, function(error) {
                toastr.error("添加失败")
            })


        }

    }

    function editStudentCtrl($scope, $uibModalInstance, student, classManagementSrv) {
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.gender = [{
            "label": "男",
            "value": 1,
        }, {
            "label": "女",
            "value": 2,
        }]
        $scope.student = student;

        if ($scope.student.gender == "男") {
            $scope.student.gender = 1
        } else {
            $scope.student.gender = 2
        }
        $scope.ok = function() {

            $uibModalInstance.close();
        }
    }
})();