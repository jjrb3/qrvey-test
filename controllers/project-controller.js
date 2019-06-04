

class ProjectController {


    verify(params) {

        if (!params.name) {
            return {
                success: false,
                message: 'Project name is required'
            }
        }

        if (!params.task_id) {
            return {
                success: false,
                message: 'Task ID is required'
            }
        }

        return {
            success: true,
            data: {
                name: params.name
            }
        }
    }


    verifyRelate(params) {

        if (!params.project_id) {
            return {
                success: false,
                message: 'Project id is required'
            }
        }

        if (!params.task_id) {
            return {
                success: false,
                message: 'Task ID is required'
            }
        }

        return {
            success: true,
            data: {
                name: params.name
            }
        }
    }
}


module.exports = {
    ProjectController
};