(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('addCourseCtrl', addCourseCtrl)
        .controller('editCourseCtrl', editCourseCtrl)
        .controller('courseManagementCtrl', courseManagementCtrl);

    addCourseCtrl.$inject = ['$scope', '$uibModalInstance', 'teacherManageSrv', 'courseManagementSrv', 'commonSrv', 'reqUrl'];
    editCourseCtrl.$inject = ['$scope', '$uibModalInstance', 'teacherManageSrv', 'courseManagementSrv', 'commonSrv', 'reqUrl', 'courseinfo'];


    courseManagementCtrl.$inject = ['$scope', '$rootScope', 'reqUrl', '$uibModal', '$state', 'courseManagementSrv'];

    function courseManagementCtrl($scope, $rootScope, reqUrl, $uibModal, $state, courseManagementSrv) {
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
                    // "url": 'http://xlab.rainlf.com:8080/course/all',
                    "url": reqUrl + '/admin/course/all',

                    "type": 'GET',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + (localStorage['token'] ? localStorage['token'] : ''));
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
                        return data.data.courseInfoList;
                    }
                },
                //设置列显示的值的 键名
                columns: [
                    { data: 'id' },

                    { data: 'courseName' },

                    { data: 'courseDes' },
                    { data: 'teacherName' },
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
                    "defaultContent": "<div class='btn-group'><button class='btn btn-info btn-outline courseMaintain'>课程实验维护</button><button class='btn btn-info btn-outline updateCourse'>更新课程</button><button class='btn btn-danger btn-outline deleteCourse'>删除课程</button></div>"
                }],
                //自定义Button
                buttons: [{
                        text: '刷新',
                        action: function(e, dt, node, config) {
                            courseTable.ajax.reload();
                        }
                    },
                    {
                        text: '新增课程',
                        action: function(e, dt, node, config) {
                            addCourse();

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


        $('#Course tbody').on('click', '.courseMaintain', function() {
            //获取当前行的某一列的数据
            //localStorageSrv.log(classTable.row($(this).parents('tr')).data().id);
            courseMaintain(courseTable.row($(this).parents('tr')).data());
        });
        $('#Course tbody').on('click', '.deleteCourse', function() {
            deleteCourse(courseTable.row($(this).parents('tr')).data());
        });
        $('#Course tbody').on('click', '.updateCourse', function() {
            updateCourse(courseTable.row($(this).parents('tr')).data());
        });

        var updateCourse = function(item) {
            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/editCourseModal.html',
                controller: 'editCourseCtrl',
                resolve: {
                    courseinfo: function() { return angular.copy(item) }
                }
            });
            modalInstance.result.then(function(result) {
                if (result) {
                    courseTable.ajax.reload();
                }
            });
        }
        var addCourse = function() {
            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/addCourseModal.html',
                controller: addCourseCtrl,

            });
            modalInstance.result.then(function(result) {
                if (result) {
                    courseTable.ajax.reload();
                }
            });
        }
        var courseMaintain = function(item) {
            $state.go('index.courseMaintainence', { courseId: item.id });
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
                        courseManagementSrv.deletecourse().save({
                                id: item.id
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
                                        courseTable.ajax.reload();
                                    });
                                } else {
                                    toastr.error(response.message)
                                }
                            },
                            function(error) {
                                toastr.error("删除失败");
                            })

                        // toastr.success("删除成功!");
                    }
                });
        }
    }

    function addCourseCtrl($scope, $uibModalInstance, teacherManageSrv, courseManagementSrv, commonSrv, reqUrl) {
        $scope.course = {};
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
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.filename = "上传260 x 185的图片"
        $scope.chooseFile = function() {
            $('#courseImage').trigger('click');
        }

        $scope.getFile = function(file) {
            console.log(file);
            var fileFormData = new FormData();
            fileFormData.append('file', file);
            // commonSrv.uploadImage().save({
            //     file: fileFormData
            // }, function(response) {
            //     console.log(response)
            // }, function(error) {
            //     console.log(error);
            //     toastr.error("上传失败")
            // })
            $.ajax({
                type: 'POST',
                url: reqUrl + '/admin/course/experiment/piclib',
                dataType: 'json',
                processData: false, // Dont process the files
                contentType: false,
                data: fileFormData,
                beforeSend: function(xhr) {
                    // xhr.setRequestHeader('access_token', '1504751421487');
                    xhr.setRequestHeader('Authorization', 'Bearer ' + (localStorage['token'] ? localStorage['token'] : ''));
                },
                success: function(res) {
                    console.log(res)
                    if (res.errorCode == 0) {
                        if (res.data.width > 265) {
                            toastr.error("图片宽度过大，请调整后上传")
                            return;
                        } else if (res.data.width < 260) {
                            toastr.error("图片宽度过小，请调整后上传")
                            return;
                        }
                        if (res.data.height > 188) {
                            toastr.error("图片高度过大，请调整后上传")
                            return;
                        } else if (res.data.height < 183) {
                            toastr.error("图片高度过小，请调整后上传")
                            return;
                        }
                        toastr.success('上传图片成功');

                        $scope.course.imageUrl = res.data.url;
                        // qiniuImage = qiniuURL + res.fileName;
                        // $scope.imageSrc = qiniuURL + res.fileName;
                        // $scope.isUpload = true;
                        $scope.$apply();
                    } else if (res.errorCode == 45) {
                        toastr.error("登录超时！");
                        $rootScope.$broadcast('ok', 0);
                    } else if (res.errorCode == 46) {
                        toastr.error("请重新登录！");
                        $rootScope.$broadcast('ok', 0)
                    } else {
                        toastr.error(res.message);
                    }

                }
            });
            $scope.filename = file.name;

            $scope.$apply()
        };
        $scope.ok = function() {
            console.log($scope.course);
            if (!$scope.course.imageUrl) {
                toastr.error("课程图片不能为空，已设置为默认")
                $scope.course.imageUrl = "https://picture.insight365.ai/phoenix/course-img1.jpg";
            }
            if (!$scope.course.courseName) {
                toastr.error("课程名称不能为空")
                return
            }
            if (!$scope.course.teacherId) {
                toastr.error("授课教师不能为空")
                return
            }
            courseManagementSrv.addcourse().save({
                "description": $scope.course.courseDes,
                "imageName": $scope.course.imageName,
                "imageUrl": $scope.course.imageUrl,
                "name": $scope.course.courseName,
                "teacherId": $scope.course.teacherId
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
            console.log($scope.course);

        }

    }

    function editCourseCtrl($scope, $uibModalInstance, teacherManageSrv, courseManagementSrv, commonSrv, reqUrl, courseinfo) {
        $scope.course = courseinfo;
        console.log(courseinfo)

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
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.filename = "上传260 x 185的图片，可留空"
        $scope.chooseFile = function() {
            $('#courseImage').trigger('click');
        }

        $scope.getFile = function(file) {
            console.log(file);
            var fileFormData = new FormData();
            fileFormData.append('file', file);
            // commonSrv.uploadImage().save({
            //     file: fileFormData
            // }, function(response) {
            //     console.log(response)
            // }, function(error) {
            //     console.log(error);
            //     toastr.error("上传失败")
            // })
            $.ajax({
                type: 'POST',
                url: reqUrl + '/admin/course/experiment/piclib',
                dataType: 'json',
                processData: false, // Dont process the files
                contentType: false,
                data: fileFormData,
                beforeSend: function(xhr) {
                    // xhr.setRequestHeader('access_token', '1504751421487');
                    xhr.setRequestHeader('Authorization', 'Bearer ' + (localStorage['token'] ? localStorage['token'] : ''));
                },
                success: function(res) {
                    console.log(res)
                    if (res.errorCode == 0) {
                        if (res.data.width > 265) {
                            toastr.error("图片宽度过大，请调整后上传")
                            return;
                        } else if (res.data.width < 260) {
                            toastr.error("图片宽度过小，请调整后上传")
                            return;
                        }
                        if (res.data.height > 188) {
                            toastr.error("图片高度过大，请调整后上传")
                            return;
                        } else if (res.data.height < 183) {
                            toastr.error("图片高度过小，请调整后上传")
                            return;
                        }
                        toastr.success('上传图片成功');

                        $scope.course.imageUrl = res.data.url;
                        // qiniuImage = qiniuURL + res.fileName;
                        // $scope.imageSrc = qiniuURL + res.fileName;
                        // $scope.isUpload = true;
                        $scope.$apply();
                    } else if (res.errorCode == 45) {
                        toastr.error("登录超时！");
                        $rootScope.$broadcast('ok', 0);
                    } else if (res.errorCode == 46) {
                        toastr.error("请重新登录！");
                        $rootScope.$broadcast('ok', 0)
                    } else {
                        toastr.error(res.message);
                    }

                }
            });
            $scope.filename = file.name;

            $scope.$apply()
        };
        $scope.ok = function() {

            console.log($scope.course);
            if (!$scope.course.courseName) {
                toastr.error("课程名称不能为空")
                return
            }

            if (!$scope.course.teacherId) {
                toastr.error("授课教师不能为空")
                return
            }
            courseManagementSrv.editCourse().save({
                "id": $scope.course.id,
                "description": $scope.course.courseDes,
                "imageName": $scope.course.imageName,
                "imageUrl": $scope.course.imageUrl,
                "name": $scope.course.courseName,
                "teacherId": $scope.course.teacherId
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