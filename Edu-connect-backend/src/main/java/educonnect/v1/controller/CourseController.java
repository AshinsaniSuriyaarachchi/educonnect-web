package educonnect.v1.controller;

import educonnect.v1.dto.request.ApiRequest;
import educonnect.v1.dto.response.ApiResponse;
import educonnect.v1.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/course")
public class CourseController {

    @Autowired
    CourseService courseService;

    @PostMapping("/save")
    public ApiResponse save(@RequestBody ApiRequest apiRequest) {
        return courseService.save(apiRequest);
    }

    @PutMapping("/update")
    public ApiResponse update(@RequestBody ApiRequest apiRequest) {
        return courseService.update(apiRequest);
    }

    @DeleteMapping("/delete/{courseId}")
    public ApiResponse delete(@PathVariable int courseId) {
        return courseService.delete(courseId);
    }

    @GetMapping("/get/{courseId}")
    public ApiResponse getByCourseId(@PathVariable int courseId) {
        return courseService.getByCourseId(courseId);
    }

    @GetMapping("/getByUniversity/{universityId}")
    public ApiResponse getByUniversityId(@PathVariable int universityId) {
        return courseService.getByUniversityId(universityId);
    }

    @GetMapping("/getRequestedCourses")
    public ApiResponse getRequestedCourses(){
        return courseService.getRequestedCourses();
    }

    @PostMapping("/approve")
    public ApiResponse approveCourse(@RequestBody ApiRequest apiRequest){
        return courseService.approveCourse(apiRequest);
    }

    @PostMapping("/reject")
    public ApiResponse rejectCourse(@RequestBody ApiRequest apiRequest){
        return courseService.rejectCourse(apiRequest);
    }

    @GetMapping("/getByUserId/{userId}")
    public ApiResponse getByUserId(@PathVariable int userId) {
        return courseService.getByUserId(userId);
    }

    @GetMapping("/getAll")
    public ApiResponse getAll() {
        return courseService.getAll();
    }
}
