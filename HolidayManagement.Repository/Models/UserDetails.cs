﻿using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HolidayManagement.Repository.Models
{
    public class UserDetails
    {
        
        [Key]
        public int ID { get; set; }

        public string UserID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string HireDate { get; set; }

        public int? MaxDays { get; set; }

        public int? TeamId { get; set; }
        public int? RolesId { get; set; }

        [ForeignKey("TeamId")]
        public virtual Team Team { get; set; }
        [ForeignKey("UserID")]
        public virtual IdentityUser AspNetUser { get; set; }
        
    }
}