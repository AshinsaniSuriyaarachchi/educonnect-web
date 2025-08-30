package educonnect.v1.service;

import educonnect.v1.dto.request.ApiRequest;
import educonnect.v1.dto.response.ApiResponse;
import org.springframework.web.multipart.MultipartFile;

public interface CourseService {
    ApiResponse save(ApiRequest apiRequest);
    ApiResponse update(ApiRequest apiRequest);
    ApiResponse getAll();
    ApiResponse getByUniversityId(int universityId);
    ApiResponse getByCourseId(int courseId);
    ApiResponse getByUserId(int userId);
    ApiResponse delete(int courseId);
    ApiResponse getRequestedCourses();
    ApiResponse approveCourse(ApiRequest apiRequest);
    ApiResponse rejectCourse(ApiRequest apiRequest);
}
