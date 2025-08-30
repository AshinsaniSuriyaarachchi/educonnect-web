package educonnect.v1.service;

import educonnect.v1.dto.request.ApiRequest;
import educonnect.v1.dto.response.ApiResponse;

public interface UserService {

    ApiResponse signUp(ApiRequest apiRequest);
    ApiResponse signIn(ApiRequest apiRequest);
    ApiResponse rate(ApiRequest apiRequest);
    ApiResponse saveCourse(ApiRequest apiRequest);
    ApiResponse getSavedCourses(ApiRequest apiRequest);
}
