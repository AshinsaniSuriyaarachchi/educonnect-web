package educonnect.v1.controller;

import educonnect.v1.dto.request.ApiRequest;
import educonnect.v1.dto.response.ApiResponse;
import educonnect.v1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * UserController handles all user-related API endpoints such as
 * signing up, signing in, rating courses, and saving courses.
 * This is a REST controller that interacts with the UserService.
 */

@RestController
@CrossOrigin // Allows cross-origin requests, useful for frontend-backend communication
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    /**
     * Handles user registration.
     * Expects an ApiRequest object containing user signup details.
     * Returns an ApiResponse indicating success or failure.
     */

    @PostMapping("/sign-up")
    public ApiResponse signUp(@RequestBody ApiRequest apiRequest) {
        return userService.signUp(apiRequest);
    }

    /**
     * Handles user login.
     * Expects an ApiRequest object containing user credentials.
     * Returns an ApiResponse with authentication result and user info.
     */


    @PostMapping("/sign-in")
    public ApiResponse signIn(@RequestBody ApiRequest apiRequest) {
        return userService.signIn(apiRequest);
    }

    @PostMapping("/rate")
    public ApiResponse rate(@RequestBody ApiRequest apiRequest){
        return userService.rate(apiRequest);
    }

    /**
     * Allows a user to save a course for later reference.
     * Expects an ApiRequest object containing the course ID and user info.
     * Returns an ApiResponse indicating whether the course was successfully saved.
     */

    @PostMapping("/save-course")
    public ApiResponse saveCourse(@RequestBody ApiRequest apiRequest){
        return userService.saveCourse(apiRequest);
    }

    @PostMapping("/get-saved-courses")
    public ApiResponse getSavedCourses(@RequestBody ApiRequest apiRequest){
        return userService.getSavedCourses(apiRequest);
    }
}
