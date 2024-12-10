const CategoryService = require("../services/category.service")

class CategoryController {
    static async createCategory(req,res) {
        const {categoryData} = req.body
        try {
            const savedCategory = await CategoryService.createCategory(categoryData)
            return res.status(201).json({
                message:'Tạo category thành công',
                data:savedCategory
            })
        } catch (error) {
            return res.status(500).json({
                message:'Lỗi khi tạo category',
                error:error.message
            })
        }
    }

    static async getAllCategory(req,res){
        try {
            const categories = await CategoryService.getAllCategory()
            return res.status(200).json({
                message:"lấy danh sách category thành công",
                data:categories
            })
        } catch (error) {
            return res.status(500).json({
                message:'Lỗi khi get all category',
                error:error.message
            })
        }
    }

    static async getCategoryById(req,res){
        const {categoryId} = req.params
        try {
            const categories = await CategoryService.getCategoryById(categoryId)
            return res.status(200).json({
                message:"Lấy category thành công",
                data:categories
            })
        } catch (error) {
            return res.status(500).json({
                message:'Lỗi khi get category by id',
                error:error.message
            })
        }
    }

    static async updateCategory(req,res){
        const {categoryId} = req.params
        const {updateData} = req.body
        try {
            const updatedCategory = await CategoryService.updateCategory(categoryId,updateData)
            
            return res.status(200).json({
                message:"Update category thành công",
                data:updatedCategory
            })
        } catch (error) {
            return res.status(500).json({
                message:'Lỗi khi update category',
                error:error.message
            })
        }
    }

    static async deleteCategory(req,res){
        const {categoryId} = req.params
        try {
            const deletedCategory = await CategoryService.deleteCategory(categoryId)
            
            return res.status(200).json({
                message:"Update category thành công",
                data:deletedCategory
            })
        } catch (error) {
            return res.status(500).json({
                message:'Lỗi khi delete category',
                error:error.message
            })
        }
    }
}

module.exports = CategoryController