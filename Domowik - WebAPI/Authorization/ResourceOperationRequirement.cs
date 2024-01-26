using Microsoft.AspNetCore.Authorization;

namespace Domowik___WebAPI.Authorization
{
    public enum ResourceOperation
    {
        Create, Read, Update, Delete
    }

    public class ResourceOperationRequirement : IAuthorizationRequirement
    {
        public ResourceOperationRequirement(ResourceOperation resourceOperation)
        {
            ResourceOperation = resourceOperation;
        }
        public ResourceOperation ResourceOperation { get; }
    }
}
