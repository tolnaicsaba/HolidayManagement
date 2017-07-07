namespace HolidayManagement.Repository.Interfaces
{
    public interface IRepository<T>
    {
        bool Lazy { get; set; }

        /// <summary>
        /// Returns the number of items of T type.
        /// </summary>
        /// <returns></returns>
        int GetItemsCount();


        void SaveChanges();
        /// <summary>
        /// 	Delete a given instance of <see cref="T"/>
        /// </summary>
        /// <param name = "item"></param>
        void Delete(T item);
    }
}
