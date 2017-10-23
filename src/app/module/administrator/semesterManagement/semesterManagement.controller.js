(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('addSemesterCtrl', addSemesterCtrl)
        .controller('editSemesterCtrl', editSemesterCtrl)
        .controller('semesterManagementCtrl', semesterManagementCtrl);

    addSemesterCtrl.$inject = ['$scope', '$uibModalInstance', 'semesterSrv'];
    editSemesterCtrl.$inject = ['$scope', '$uibModalInstance', 'semester', 'semesterSrv']
    semesterManagementCtrl.$inject = ['$scope', 'reqUrl', '$uibModal', 'semesterSrv'];

    function semesterManagementCtrl($scope, reqUrl, $uibModal, semesterSrv) {
        var vm = this;



        var semesterTable = $('#Semester').DataTable({
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
                    // "url": 'http://xlab.rainlf.com:8080/course/term/all',
                    "url": reqUrl + '/admin/semester/all',

                    "type": 'GET',
                    beforeSend: function(xhr) {
                        // xhr.setRequestHeader('access_token', '1504751421487');
                    },
                    "dataSrc": function(data) {
                        console.log(data);
                        // localStorageSrv.log('ajax data:'+JSON.stringify(data));
                        return data.data.semesterList;
                    }
                },
                //设置列显示的值的 键名
                columns: [
                    { data: 'id' },
                    { data: 'year' },
                    { data: 'description' },

                    { data: '' }
                ],
                //自定义列，这里定义了最后一列的按钮
                columnDefs: [{
                    "targets": -1,
                    "data": null,
                    'className': "lsr-body-center",
                    "defaultContent": "<div class='btn-group'><button class='btn btn-info btn-outline editSemester'>编辑</button><button class='btn btn-danger btn-outline deleteSemester'>删除</button></div>"
                }],
                //自定义Button
                buttons: [{
                        text: '刷新',
                        action: function(e, dt, node, config) {
                            dt.ajax.reload();
                        }
                    },
                    {
                        text: '新增',
                        action: function(e, dt, node, config) {
                            addSemester();
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

        $('#Semester tbody').on('click', '.editSemester', function() {
            //获取当前行的某一列的数据
            //localStorageSrv.log(classTable.row($(this).parents('tr')).data().id);
            editSemester(semesterTable.row($(this).parents('tr')).data());
        });
        $('#Semester tbody').on('click', '.deleteSemester', function() {
            deleteSemester(semesterTable.row($(this).parents('tr')).data());
        });

        var addSemester = function() {
            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/addSemesterModal.html',
                controller: addSemesterCtrl,

            });
            modalInstance.result.then(function(result) {

                if (result) {
                    semesterTable.ajax.reload();

                }
            });
        }
        var editSemester = function(item) {
            console.log(item);
            var modalInstance = $uibModal.open({
                size: "md",
                templateUrl: 'app/module/modal/editSemesterModal.html',
                controller: editSemesterCtrl,
                resolve: {
                    semester: function() { return angular.copy(item); }
                }
            });
            modalInstance.result.then(function(result) {
                if (result) {
                    semesterTable.ajax.reload();

                }
            });
        }
        var deleteSemester = function(item) {
            console.log(item);
            swal({
                    title: "确定要删除吗？",
                    text: "【" + item.description + "】" + "将被删除",
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

                        semesterSrv.deletesemester().save({
                                "semesterId": item.id
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
                                        semesterTable.ajax.reload();
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
    }

    function addSemesterCtrl($scope, $uibModalInstance, semesterSrv) {
        $scope.semester = {};

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }

        $scope.semesterLabel = [{
            "label": "第一学期",
            "value": 1,
        }, {
            "label": "第二学期",
            "value": 2,
        }, {
            "label": "第三学期",
            "value": 3,
        }]
        $scope.semester.semester = 1;
        $scope.ok = function() {
            if (!$scope.semester.semesterYear) {
                toastr.error("学年不能为空")
                return
            }
            semesterSrv.addNewSemester().save({
                    "semester": $scope.semester.semester,
                    "year": $scope.semester.semesterYear

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

    function editSemesterCtrl($scope, $uibModalInstance, semester, semesterSrv) {
        $scope.semester = semester;

        $scope.semesterLabel = [{
            "label": "第一学期",
            "value": 1,
        }, {
            "label": "第二学期",
            "value": 2,
        }, {
            "label": "第三学期",
            "value": 3,
        }]
        console.log($scope.semester);

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {
            if (!$scope.semester.year) {
                toastr.error("学年不能为空")
                return
            }
            semesterSrv.editsemester().save({
                    "id": $scope.semester.id,
                    "semester": $scope.semester.semester,
                    "year": $scope.semester.year

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