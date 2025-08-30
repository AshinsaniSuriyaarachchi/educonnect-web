package educonnect.v1.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import educonnect.v1.dto.request.ApiRequest;
import educonnect.v1.dto.response.ApiResponse;
import educonnect.v1.exception.EduConnectValidationsException;
import educonnect.v1.service.UniversityService;
import educonnect.v1.util.ResponseCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping("/university")
public class UniversityController {

    @Autowired
    UniversityService universityService;

    @PostMapping(value = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse save(@RequestParam("logo") MultipartFile logo, @RequestParam("ugcLetter") MultipartFile ugcLetter, @RequestParam("apiRequest") String apiRequestJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ApiRequest apiRequest = objectMapper.readValue(apiRequestJson, ApiRequest.class);
            return universityService.save(logo, ugcLetter, apiRequest);
        } catch (JsonProcessingException e) {
            throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                    "Invalid request format");
        }
    }

    @GetMapping("/list")
    public ApiResponse getAllUniversities() {
        return universityService.getAllUniversities();
    }

    @GetMapping("/getRequestedUniversities")
    public ApiResponse getRequestedUniversities(){
        return universityService.getRequestedUniversities();
    }

    @GetMapping("/getAllUniversities")
    public ApiResponse getAllUniversitiesByNoChecking(){
        return universityService.getAllApprovedOrRejectedUniversities();
    }

    @PostMapping("/approve")
    public ApiResponse approveCourse(@RequestBody ApiRequest apiRequest){
        return universityService.approveUniversity(apiRequest);
    }

    @PostMapping("/reject")
    public ApiResponse rejectCourse(@RequestBody ApiRequest apiRequest){
        return universityService.rejectUniversity(apiRequest);
    }

}
