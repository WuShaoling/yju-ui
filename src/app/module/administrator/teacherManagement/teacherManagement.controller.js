(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('teacherManagementCtrl', teacherManagementCtrl)
        .controller('addTeacherCtrl', addTeacherCtrl)
        .controller('editTeacherCtrl', editTeacherCtrl)
        .controller('batchAddTeacherCtrl', batchAddTeacherCtrl);

    batchAddTeacherCtrl.$inject = ['$scope', '$uibModalInstance', '$stateParams', 'reqUrl', 'usSpinnerService', '$state'];

    teacherManagementCtrl.$inject = ['$scope', 'reqUrl', '$uibModal', 'teacherManageSrv', 'commonSrv', '$state'];
    addTeacherCtrl.$inject = ['$scope', '$uibModalInstance', 'teacherManageSrv'];
    editTeacherCtrl.$inject = ['$scope', '$uibModalInstance', 'teacher', 'teacherManageSrv'];

    function batchAddTeacherCtrl($scope, $uibModalInstance, $stateParams, reqUrl, usSpinnerService, $state) {
        $scope.close = function() {
            $uibModalInstance.close('dismiss')
        };
        $scope.ok = function() {
            $scope.disableUpload = true;
            usSpinnerService.spin('upload-teacher');
            console.log($scope.selectedFile);
            var formdata = new FormData();
            formdata.append('file', $scope.selectedFile)
            $.ajax({
                type: 'POST',
                url: $scope.importURL,
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
                        toastr.warning("登录超时！");
                        usSpinnerService.stop('upload-teacher');
                        localStorage['requireLogin'] = true
                        $state.go("index.main", null, { reload: true })
                    } else if (res.errorCode == 46) {
                        toastr.warning("请重新登录！");
                        usSpinnerService.stop('upload-teacher');
                        localStorage['requireLogin'] = true
                        $state.go("index.main", null, { reload: true })
                    } else {
                        toastr.error(res.message);
                        usSpinnerService.stop('upload-teacher');

                    }
                }
            });

        }
        $scope.importURL = reqUrl + '/admin//teacher/batchCreation';

    }

    function teacherManagementCtrl($scope, reqUrl, $uibModal, teacherManageSrv, commonSrv, $state) {
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
                    // 'url': 'http://xlab.rainlf.com:8080/user/teacher/all',
                    "url": reqUrl + '/admin/teacher/all',
                    "type": 'GET',
                    beforeSend: function(xhr) {
                        // xhr.setRequestHeader('access_token', '1504751421487');
                        xhr.setRequestHeader('Authorization', 'Bearer ' + (localStorage['token'] ? localStorage['token'] : ''));

                    },
                    "dataSrc": function(data) {

                        console.log(data)
                            // localStorageSrv.log('ajax data:'+JSON.stringify(data));
                        return data.data.teacherInfoList;
                    }
                },
                //设置列显示的值的 键名
                columns: [
                    { data: 'teacherNo' },

                    { data: 'teacherName' },

                    { data: 'teacherTitle' },
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
                        text: '导入教师名单',
                        action: function(e, dt, node, config) {
                            batchAddTeacher();
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
                if (xhr.status == 200) {
                    console.log(xhr)
                    if (xhr.responseJSON.errorCode == 45) {
                        toastr.warning("登录超时！");
                        localStorage['requireLogin'] = true
                        $state.go("index.main", null, { reload: true })
                    } else if (xhr.responseJSON.errorCode == 46) {
                        toastr.warning("请重新登录！");
                        localStorage['requireLogin'] = true
                        $state.go("index.main", null, { reload: true })
                    } else if (xhr.responseJSON.errorCode != 0) {
                        toastr.error(xhr.responseJSON.message);
                    }
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


        var batchAddTeacher = function() {

            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/batchAddTeacherModal.html',
                controller: 'batchAddTeacherCtrl',
                // resolve: {
                //     classId: function() { return angular.copy(item); }
                // }
            });

            modalInstance.result.then(function(result) {
                if (result) {
                    teacherTable.ajax.reload();
                }

            });
        }
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

                if (result) {
                    teacherTable.ajax.reload();

                }
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
                        console.log(item)
                        teacherManageSrv.deleteTeacher().save({
                            "teacherId": item.id
                        }, function(response) {
                            console.log(response)
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
                                    teacherTable.ajax.reload();
                                });
                            } else {
                                toastr.error(response.message);

                            }
                        }, function(error) {
                            console.log(error);
                            toastr.error("删除失败，请稍后再试！");

                        })

                        // toastr.success("删除成功!");
                    }
                });
        }
        var resetPass = function(item) {
            console.log(item);

            swal({
                    title: "确定要重置吗？",
                    text: "编号为" + item.teacherNo + "的教师密码将被重置为【12345678】",
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
                                    }, function() {

                                    });
                                } else {
                                    toastr.error(response.message);

                                }
                            },
                            function() {
                                toastr.error("重置失败")
                            })

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
                if (result) {
                    teacherTable.ajax.reload();

                }
            }, function(reason) {
                console.log(reason);
            });
        }
    }


    function addTeacherCtrl($scope, $uibModalInstance, teacherManageSrv) {
        $scope.teacher = {}
        $scope.gender = [{
            label: "男",
            value: 1,
        }, {
            label: "女",
            value: 2,
        }]
        $scope.title = [{
            label: "教授",
            value: 1,
        }, {
            label: "副教授",
            value: 2,
        }, {
            label: "讲师",
            value: 3,
        }]
        $scope.teacher.gender = 1;
        $scope.teacher.title = 1;
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        var validatemobile = function(mobile) {
            // if (mobile.length == 0) {
            //     toastr.error('请输入手机号码或邮箱地址');
            //     return false;
            // }
            if (mobile.length != 11) {
                // toastr.error('请输入正确的电话格式或邮箱地址');

                return false;
            }
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!myreg.test(mobile)) {
                // toastr.error('请输入正确的电话格式或邮箱地址');
                return false;
            }

            return true;
        }
        var validateEmail = function(email) {
            var myreg = /(\S)+[@]{1}(\S)+[.]{1}(\w)+/;
            if (!myreg.test(email)) {
                // toastr.error("请输入正确的电话格式或邮箱地址");
                return false;
            }
            return true;
        }
        $scope.ok = function() {
            console.log($scope.teacher);

            if (!$scope.teacher.id) {
                toastr.error("教师编号不能为空");
                return;
            }
            if (!$scope.teacher.name) {
                toastr.error("教师名字不能为空");
                return;
            }
            if (!$scope.teacher.contact) {
                toastr.error("教师联系方式不能为空");
                return;
            } else if (!validatemobile($scope.teacher.contact) && !validateEmail($scope.teacher.contact)) {
                toastr.error("请输入正确的电话格式或邮箱地址");

                return;
            }
            teacherManageSrv.addNewTeacher().save({
                    "gender": $scope.teacher.gender,
                    "teacherContact": $scope.teacher.contact,
                    "teacherName": $scope.teacher.name,
                    "teacherNo": $scope.teacher.id,
                    "teacherTitleId": $scope.teacher.title
                }, function(response) {
                    console.log(response)
                    if (response.errorCode === 0) {
                        toastr.success('添加成功');
                        $uibModalInstance.close(1);
                    } else {
                        toastr.error(response.message);
                    }

                },
                function(error) {
                    console.log(error);
                    toastr.error('添加失败');

                })

        }

    }

    function editTeacherCtrl($scope, $uibModalInstance, teacher, teacherManageSrv) {
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
        $scope.title = [{
            "label": "教授",
            "value": 1,
        }, {
            "label": "副教授",
            "value": 2,
        }, {
            "label": "讲师",
            "value": 3,
        }]
        $scope.teacher = teacher;
        for (var i in $scope.title) {
            if ($scope.teacher.teacherTitle == $scope.title[i].label) {
                $scope.teacher.teacherTitle = $scope.title[i].value;
            }
        }
        // $scope.teacher.gender = $scope.gender[1];

        console.log($scope.teacher)
        console.log($scope.teacher.gender);
        if ($scope.teacher.gender == "男") {
            $scope.teacher.gender = 1
        } else {
            $scope.teacher.gender = 2
        }

        var validatemobile = function(mobile) {
            // if (mobile.length == 0) {
            //     // toastr.error('请输入手机号码！');
            //     return false;
            // }
            if (mobile.length != 11) {
                // toastr.error('请输入有效的手机号码！');

                return false;
            }
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!myreg.test(mobile)) {
                // toastr.error('请输入有效的手机号码！');
                return false;
            }

            return true;
        }
        var validateEmail = function(email) {
            var myreg = /(\S)+[@]{1}(\S)+[.]{1}(\w)+/;
            if (!myreg.test(email)) {
                // toastr.error("请输入正确的邮箱地址");
                return false;
            }
            return true;
        }
        $scope.ok = function() {
            console.log($scope.teacher);
            if (!$scope.teacher.teacherNo) {
                toastr.error("教师编号不能为空");
                return;
            }
            if (!$scope.teacher.teacherName) {
                toastr.error("教师名字不能为空");
                return;
            }
            if (!$scope.teacher.teacherContact) {
                toastr.error("教师联系方式不能为空");
                return;
            } else if (!validatemobile($scope.teacher.teacherContact) && !validateEmail($scope.teacher.teacherContact)) {
                toastr.error("请输入正确的电话格式或邮箱地址");

                return
            }
            teacherManageSrv.editTeacher().save({
                    "id": $scope.teacher.id,
                    "gender": $scope.teacher.gender,
                    "teacherContact": $scope.teacher.teacherContact,
                    "teacherName": $scope.teacher.teacherName,
                    "teacherNo": $scope.teacher.teacherNo,
                    "teacherTitleId": $scope.teacher.teacherTitle
                }, function(response) {
                    console.log(response)
                    if (response.errorCode === 0) {
                        toastr.success('更新成功');
                        $uibModalInstance.close(1);
                    } else {
                        toastr.error(response.message);
                    }

                },
                function(error) {
                    console.log(error);
                    toastr.error('更新失败');

                })

        }
    }

})();