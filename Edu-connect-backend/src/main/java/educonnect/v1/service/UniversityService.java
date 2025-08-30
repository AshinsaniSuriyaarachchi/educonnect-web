package educonnect.v1.service;

import educonnect.v1.dto.request.ApiRequest;
import educonnect.v1.dto.response.ApiResponse;
import org.springframework.web.multipart.MultipartFile;

public interface UniversityService {
    ApiResponse save(MultipartFile logo, MultipartFile ugcLetter, ApiRequest apiRequest);
    ApiResponse getAllUniversities();
    ApiResponse getRequestedUniversities();
    ApiResponse getAllApprovedOrRejectedUniversities();
    ApiResponse approveUniversity(ApiRequest apiRequest);
    ApiResponse rejectUniversity(ApiRequest apiRequest);
}
