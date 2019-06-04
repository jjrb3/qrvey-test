

class ProjectController {


    verify(params) {

        if (!params.name) {
            return {
                success: false,
                message: 'Project name id required'
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