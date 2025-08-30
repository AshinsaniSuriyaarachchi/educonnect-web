package educonnect.v1.service.impl;

import educonnect.v1.dto.CourseDTO;
import educonnect.v1.dto.CourseStatus;
import educonnect.v1.dto.request.ApiRequest;
import educonnect.v1.dto.response.ApiResponse;
import educonnect.v1.entity.Course;
import educonnect.v1.entity.University;
import educonnect.v1.entity.User;
import educonnect.v1.exception.EduConnectValidationsException;
import educonnect.v1.repository.CourseRepository;
import educonnect.v1.repository.UniversityRepository;
import educonnect.v1.repository.UserRepository;
import educonnect.v1.service.CourseService;
import educonnect.v1.util.Constant;
import educonnect.v1.util.Messages;
import educonnect.v1.util.RequestStatus;
import educonnect.v1.util.ResponseCodes;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    UniversityRepository universityRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    Messages messages;

    private static final Logger logger = LoggerFactory.getLogger(CourseServiceImpl.class);

    @Override
    public ApiResponse save(ApiRequest apiRequest) {
        logger.info("Course Save Starts");

        ApiResponse apiResponse = new ApiResponse();

        try {
            // Validate request
            if (apiRequest == null || apiRequest.getCourseDTO() == null) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMandatoryValidationFailureMessage("ApiRequest or Course"));
            }

            CourseDTO courseDTO = apiRequest.getCourseDTO();

            Optional<University> university = universityRepository.findById(apiRequest.getCourseDTO().getUniversity());
            Optional<User> user = userRepository.findById(apiRequest.getCourseDTO().getUserId());
            if (university.isEmpty()) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMessageForResponseCode(ResponseCodes.UNIVERSITY_NOT_FOUND, null));
            }
            if (user.isEmpty()) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMessageForResponseCode(ResponseCodes.USER_NOT_FOUND, null));
            }

            // Course map and save
            Course course = modelMapper.map(courseDTO, Course.class);
            course.setUniversity(university.get());
            course.setUser(user.get());
            course.setIsDeleted(Constant.DB_FALSE);
            course.setCourseStatus(CourseStatus.PENDING);
            Course savedCourse = courseRepository.save(course);
            apiResponse.setCourse(savedCourse);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_SAVE_SUCCESS, null));

        } catch (EduConnectValidationsException exception) {
            logger.error("Course Save Validation Failure", exception);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(exception.getCode());
            apiResponse.setMessage(exception.getMessage());
        } catch (Exception e) {
            logger.error("Course Save Validation Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.COURSE_SAVE_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_SAVE_FAILED, null));
        }

        logger.info("Course Save Ends");
        return apiResponse;
    }

    @Override
    public ApiResponse update(ApiRequest apiRequest) {
        logger.info("Course Update Starts");

        ApiResponse apiResponse = new ApiResponse();

        try {
            // Validate request
            if (apiRequest == null || apiRequest.getCourseDTO() == null || apiRequest.getCourseDTO().getCourseId() == 0) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMandatoryValidationFailureMessage("ApiRequest or Course"));
            }

            CourseDTO courseDTO = apiRequest.getCourseDTO();
            Optional<Course> courseOptional = courseRepository.findById(courseDTO.getCourseId());

            // Course map and update
            if (courseOptional.isPresent()) {
                Course course = courseOptional.get();
                modelMapper.map(courseDTO, course);  // Update the existing course entity
                courseRepository.save(course);
                apiResponse.setCourse(course);
                apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_UPDATE_SUCCESS, null));
            } else {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMessageForResponseCode(ResponseCodes.COURSE_NOT_FOUND, null));
            }

        } catch (EduConnectValidationsException exception) {
            logger.error("Course Update Validation Failure", exception);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(exception.getCode());
            apiResponse.setMessage(exception.getMessage());
        } catch (Exception e) {
            logger.error("Course Update Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.COURSE_UPDATE_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_UPDATE_FAILED, null));
        }

        logger.info("Course Update Ends");
        return apiResponse;
    }

    @Override
    public ApiResponse delete(int courseId) {
        logger.info("Course Delete Starts");

        ApiResponse apiResponse = new ApiResponse();

        try {
            Optional<Course> courseOptional = courseRepository.findById(courseId);

            if (courseOptional.isPresent()) {
                Course course = courseOptional.get();
                course.setIsDeleted(Constant.DB_TRUE);  // Mark as deleted
                courseRepository.save(course);

                apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_DELETE_SUCCESS, null));
            } else {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMessageForResponseCode(ResponseCodes.COURSE_NOT_FOUND, null));
            }

        } catch (EduConnectValidationsException exception) {
            logger.error("Course Delete Validation Failure", exception);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(exception.getCode());
            apiResponse.setMessage(exception.getMessage());
        } catch (Exception e) {
            logger.error("Course Delete Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.COURSE_DELETE_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_DELETE_FAILED, null));
        }

        logger.info("Course Delete Ends");
        return apiResponse;
    }

    @Override
    public ApiResponse getRequestedCourses() {
        logger.info("Get Requested Courses Starts");

        ApiResponse apiResponse = new ApiResponse();

        try {
            List<Course> courses = courseRepository.findCourseByIsNotApproved(CourseStatus.PENDING);
            apiResponse.setCourseList(courses);

        } catch (Exception e) {
            logger.error("Get Requested Courses Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.COURSE_FETCH_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_FETCH_FAILED, null));
        }

        logger.info("Get Requested Courses Ends");
        return apiResponse;
    }

    @Override
    @Transactional
    public ApiResponse approveCourse(ApiRequest apiRequest) {
        logger.info("Course Approve Starts");

        ApiResponse apiResponse = new ApiResponse();
        try {
            // Find course and change status
            Optional<Course> optionalCourse = courseRepository.findById(apiRequest.getCourseId());
            if (optionalCourse.isPresent()) {
                optionalCourse.get().setCourseStatus(CourseStatus.APPROVED);
                Course savedCourse = courseRepository.save(optionalCourse.get());
                apiResponse.setCourse(savedCourse);
            } else {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMessageForResponseCode(ResponseCodes.COURSE_NOT_FOUND, null));
            }
        } catch (EduConnectValidationsException exception) {
            logger.error("Course Approve Validation Failure", exception);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(exception.getCode());
            apiResponse.setMessage(exception.getMessage());
        } catch (Exception e) {
            logger.error("Course Approve Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.COURSE_APPROVE_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_APPROVE_FAILED, null));
        }

        logger.info("Course Approve Ends");
        return apiResponse;
    }

    @Override
    @Transactional
    public ApiResponse rejectCourse(ApiRequest apiRequest) {
        logger.info("Course Reject Starts");

        ApiResponse apiResponse = new ApiResponse();
        try {
            // Find course and change status
            Optional<Course> optionalCourse = courseRepository.findById(apiRequest.getCourseId());
            if (optionalCourse.isPresent()) {
                optionalCourse.get().setCourseStatus(CourseStatus.REJECTED);
                Course savedCourse = courseRepository.save(optionalCourse.get());
                apiResponse.setCourse(savedCourse);
            } else {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMessageForResponseCode(ResponseCodes.COURSE_NOT_FOUND, null));
            }
        } catch (EduConnectValidationsException exception) {
            logger.error("Course Reject Validation Failure", exception);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(exception.getCode());
            apiResponse.setMessage(exception.getMessage());
        } catch (Exception e) {
            logger.error("Course Reject Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.COURSE_REJECT_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_REJECT_FAILED, null));
        }

        logger.info("Course Reject Ends");
        return apiResponse;
    }

    @Override
    public ApiResponse getByCourseId(int courseId) {
        logger.info("Get Course by Course ID Starts");

        ApiResponse apiResponse = new ApiResponse();

        try {
            Optional<Course> courseOptional = courseRepository.findById(courseId);

            if (courseOptional.isPresent()) {
                apiResponse.setCourse(courseOptional.get());
            } else {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMessageForResponseCode(ResponseCodes.COURSE_NOT_FOUND, null));
            }

        } catch (EduConnectValidationsException exception) {
            logger.error("Get Course by ID Validation Failure", exception);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(exception.getCode());
            apiResponse.setMessage(exception.getMessage());
        } catch (Exception e) {
            logger.error("Get Course by ID Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.COURSE_FETCH_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_FETCH_FAILED, null));
        }

        logger.info("Get Course by Course ID Ends");
        return apiResponse;
    }

    @Override
    public ApiResponse getByUserId(int userId) {
        logger.info("Get Courses by User ID Starts");

        ApiResponse apiResponse = new ApiResponse();

        try {
            Optional<User> optionalUser = userRepository.findById(userId);

            if (optionalUser.isPresent()) {
                List<Course> courses = courseRepository.findCoursesByUser(optionalUser.get());
                apiResponse.setCourseList(courses);
            } else {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMessageForResponseCode(ResponseCodes.UNIVERSITY_NOT_FOUND, null));
            }

        } catch (EduConnectValidationsException exception) {
            logger.error("Get Courses by User ID Validation Failure", exception);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(exception.getCode());
            apiResponse.setMessage(exception.getMessage());
        } catch (Exception e) {
            logger.error("Get Courses by User ID Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.COURSE_FETCH_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_FETCH_FAILED, null));
        }

        logger.info("Get Courses by User ID Ends");
        return apiResponse;
    }

    @Override
    public ApiResponse getByUniversityId(int universityId) {
        logger.info("Get Courses by University ID Starts");

        ApiResponse apiResponse = new ApiResponse();

        try {
            Optional<University> universityOptional = universityRepository.findById(universityId);

            if (universityOptional.isPresent()) {
                List<Course> courses = courseRepository.findByUniversity(universityOptional.get());
                apiResponse.setCourseList(courses);
            } else {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE, messages.getMessageForResponseCode(ResponseCodes.UNIVERSITY_NOT_FOUND, null));
            }

        } catch (EduConnectValidationsException exception) {
            logger.error("Get Courses by University ID Validation Failure", exception);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(exception.getCode());
            apiResponse.setMessage(exception.getMessage());
        } catch (Exception e) {
            logger.error("Get Courses by University ID Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.COURSE_FETCH_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_FETCH_FAILED, null));
        }

        logger.info("Get Courses by University ID Ends");
        return apiResponse;
    }

    @Override
    public ApiResponse getAll() {
        logger.info("Get All Courses Starts");

        ApiResponse apiResponse = new ApiResponse();

        try {
            List<Course> courses = courseRepository.findCourseByIsDeleted(CourseStatus.APPROVED);
            apiResponse.setCourseList(courses);

        } catch (Exception e) {
            logger.error("Get All Courses Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.COURSE_FETCH_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_FETCH_FAILED, null));
        }

        logger.info("Get All Courses Ends");
        return apiResponse;
    }


}
