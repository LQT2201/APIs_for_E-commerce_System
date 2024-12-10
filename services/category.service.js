const Category = require("../models/category.model");

class CategoryService {
    static async createCategory(categoryData) {
        try {
            const newCategory = new Category(categoryData)
            const savedCategory = await newCategory.save()
            return savedCategory
        } catch (error) {
            throw new Error("Lỗi khi tạo category")
        }
    }

    static async getAllCategory(){
        try {
            return await Category.find()
        } catch (error) {
            throw new Error("Lỗi khi get all category")
        }
    }

    static async getCategoryById(categoryId){
        try {
            if(!categoryId) throw new Error("Không tìm thấy id cate")
            return await Category.findById(categoryId)
        } catch (error) {
            throw new Error("Lỗi khi get category by id")
        }
    }

    static async updateCategory(categoryId,updateData){
        try {
            const updatedCategory = await Category.findByIdAndUpdate(
                categoryId,
                {$set:updateData},
                {new:true}
            )

            return updatedCategory
        } catch (error) {
            throw new Error('Lỗi update category')
        }
    }

    static async deleteCategory(categoryId){
        try {
            const deletedCategory = await Category.findByIdAndDelete(categoryId)
            return deletedCategory
        } catch (error) {
            throw new Error('Lỗi delete category')
        }
    }
}

module.exports = CategoryService