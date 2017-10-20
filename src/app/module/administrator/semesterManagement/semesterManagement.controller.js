(function() {
    'use strict';

    angular
        .module('phoenix')
        .controller('addSemesterCtrl', addSemesterCtrl)
        .controller('editSemesterCtrl', editSemesterCtrl)
        .controller('semesterManagementCtrl', semesterManagementCtrl);

    addSemesterCtrl.$inject = ['$scope', '$uibModalInstance'];
    editSemesterCtrl.$inject = ['$scope', '$uibModalInstance', 'semester']
    semesterManagementCtrl.$inject = ['$scope', 'reqUrl', '$uibModal'];

    function semesterManagementCtrl($scope, reqUrl, $uibModal) {
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
                    "url": reqUrl + '/administrator/semesterManagement/semester.json',

                    "type": 'GET',
                    beforeSend: function(xhr) {
                        // xhr.setRequestHeader('access_token', '1504751421487');
                    },
                    "dataSrc": function(data) {

                        data.data.map(function(item) {

                            console.log(item);

                            item.semester = "第" + item.semester + "学期"



                            return item;
                        });
                        // localStorageSrv.log('ajax data:'+JSON.stringify(data));
                        return data.data;
                    }
                },
                //设置列显示的值的 键名
                columns: [
                    { data: 'termId' },
                    { data: 'semesterYear' },
                    { data: 'semester' },

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
            modalInstance.result.then(function(result) {}, function(reason) {
                console.log(reason);
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
            modalInstance.result.then(function(result) {}, function(reason) {
                console.log(reason);
            });
        }
        var deleteSemester = function(item) {
            console.log(item);
            swal({
                    title: "确定要删除吗？",
                    text: item.semesterYear + item.semester + "将被删除",
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
                            semesterTable.ajax.reload();
                        });
                        // toastr.success("删除成功!");
                    }
                });
        }
    }

    function addSemesterCtrl($scope, $uibModalInstance) {
        $scope.semester = {};

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {
            console.log($scope.semester);
            $uibModalInstance.close();
        }
    }

    function editSemesterCtrl($scope, $uibModalInstance, semester) {
        $scope.semester = semester;
        console.log($scope.semester);
        if ($scope.semester.semester == "第一学期") {
            console.log(1)
            $scope.semester.semester = "1";
        } else {
            console.log(2)

            $scope.semester.semester = "2";

        }
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.ok = function() {
            console.log($scope.semester);
            $uibModalInstance.close();
        }
    }

})();