package educonnect.v1.service.impl;

import educonnect.v1.dto.RateDTO;
import educonnect.v1.dto.UserDTO;
import educonnect.v1.dto.request.ApiRequest;
import educonnect.v1.dto.response.ApiResponse;
import educonnect.v1.entity.Course;
import educonnect.v1.entity.Rate;
import educonnect.v1.entity.SavedCourse;
import educonnect.v1.entity.User;
import educonnect.v1.exception.EduConnectValidationsException;
import educonnect.v1.repository.CourseRepository;
import educonnect.v1.repository.RateRepository;
import educonnect.v1.repository.SavedCourseRepository;
import educonnect.v1.repository.UserRepository;
import educonnect.v1.service.UserService;
import educonnect.v1.util.Messages;
import educonnect.v1.util.RequestStatus;
import educonnect.v1.util.ResponseCodes;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RateRepository rateRepository;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    SavedCourseRepository savedCourseRepository;

    @Autowired
    Messages messages;

    @Autowired
    ModelMapper modelMapper;

    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public ApiResponse signUp(ApiRequest apiRequest) {
        logger.info("User Sign Up Starts");
        ApiResponse apiResponse = new ApiResponse();

        try {
            // Validate request
            if (apiRequest == null || apiRequest.getUserDTO() == null) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                        messages.getMandatoryValidationFailureMessage("ApiRequest"));
            }

            UserDTO userDTO = apiRequest.getUserDTO();
            if (userDTO.getUserName() == null || userDTO.getEmail() == null || userDTO.getPassword() == null) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                        messages.getMessageForResponseCode(ResponseCodes.EMPTY_CREDENTIALS, null));
            }

            // User map and save
            User user = modelMapper.map(userDTO, User.class);
            user.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
            User savedUser = userRepository.save(user);

            logger.info("User Sign Up Success");
            apiResponse.setUser(savedUser);
            apiResponse.setStatus(RequestStatus.SUCCESS.getStatus());
            apiResponse.setResponseCode(ResponseCodes.SUCCESS);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.USER_SIGNUP_SUCCESS, null));

        } catch (EduConnectValidationsException rve) {
            logger.error("User Sign Up Validation Failure", rve);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(rve.getCode());
            apiResponse.setMessage(rve.getMessage());
        } catch (Exception e) {
            logger.error("User Sign Up Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.USER_SIGNUP_FAILURE);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.USER_SIGNUP_FAILURE, null));
        }

        logger.info("User Sign Up Ends");
        return apiResponse;
    }

    @Override
    public ApiResponse signIn(ApiRequest apiRequest) {
        logger.info("User Sign In Starts");
        ApiResponse apiResponse = new ApiResponse();

        try {
            // Validate request
            if (apiRequest == null || apiRequest.getUserDTO() == null) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                        messages.getMandatoryValidationFailureMessage("ApiRequest"));
            }

            UserDTO userDTO = apiRequest.getUserDTO();
            if (userDTO.getEmail() == null || userDTO.getPassword() == null) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                        messages.getMessageForResponseCode(ResponseCodes.EMPTY_CREDENTIALS, null));
            }

            // Find user by email and type
            Optional<User> userOptional = userRepository.findByEmail(userDTO.getEmail());
            if (userOptional.isEmpty()) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                        messages.getMessageForResponseCode(ResponseCodes.USER_NOT_FOUND, null));
            }

            // Check password match
            User user = userOptional.get();
            if (!bCryptPasswordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                        messages.getMessageForResponseCode(ResponseCodes.PASSWORD_MISMATCH, null));
            }

            logger.info("User Sign In Success");
            apiResponse.setStatus(RequestStatus.SUCCESS.getStatus());
            apiResponse.setResponseCode(ResponseCodes.SUCCESS);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.USER_SIGN_IN_SUCCESS, null));
            apiResponse.setUser(user);

        } catch (EduConnectValidationsException rve) {
            logger.error("User Sign In Validation Failure", rve);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(rve.getCode());
            apiResponse.setMessage(rve.getMessage());
        } catch (Exception e) {
            logger.error("User Sign In Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.USER_SIGN_IN_FAILURE);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.USER_SIGN_IN_FAILURE, null));
        }

        logger.info("User Sign In Ends");
        return apiResponse;
    }

    @Override
    public ApiResponse rate(ApiRequest apiRequest) {
        logger.info("User Rate Starts");
        ApiResponse apiResponse = new ApiResponse();

        try {
            // Validate request
            if (apiRequest == null || apiRequest.getRateDTO() == null) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                        messages.getMandatoryValidationFailureMessage("ApiRequest"));
            }
            RateDTO rateDTO = apiRequest.getRateDTO();
            Optional<User> userOptional = userRepository.findById(apiRequest.getUserId());

            if (userOptional.isEmpty()) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                        messages.getMessageForResponseCode(ResponseCodes.USER_NOT_FOUND, null));
            }

            // Rate map and save
            Rate rate = modelMapper.map(rateDTO, Rate.class);
            rate.setUser(userOptional.get());
            Rate savedRate = rateRepository.save(rate);
            logger.info("User Rate Success");

            apiResponse.setRate(savedRate);
            apiResponse.setStatus(RequestStatus.SUCCESS.getStatus());
            apiResponse.setResponseCode(ResponseCodes.SUCCESS);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.USER_RATE_SUCCESS, null));

        } catch (EduConnectValidationsException rve) {
            logger.error("User Rate Failure", rve);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(rve.getCode());
            apiResponse.setMessage(rve.getMessage());
        } catch (Exception e) {
            logger.error("User Rate Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.USER_RATE_FAILURE);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.USER_RATE_FAILURE, null));
        }


        logger.info("User Rate Ends");
        return apiResponse;
    }

    @Override
    public ApiResponse saveCourse(ApiRequest apiRequest) {
        logger.info("User Course Save Starts");
        ApiResponse apiResponse = new ApiResponse();

        try {
            // Validate request
            if (apiRequest == null || apiRequest.getUserId() == null || apiRequest.getCourseId() == null) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                        messages.getMandatoryValidationFailureMessage("ApiRequest"));
            }

            Optional<User> optionalUser = userRepository.findById(apiRequest.getUserId());
            if (optionalUser.isEmpty()) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                        messages.getMessageForResponseCode(ResponseCodes.USER_NOT_FOUND, null));
            }

            Optional<Course> optionalCourse = courseRepository.findById(apiRequest.getCourseId());
            if (optionalCourse.isEmpty()) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                        messages.getMessageForResponseCode(ResponseCodes.COURSE_NOT_FOUND, null));
            }

            SavedCourse savedCourse = new SavedCourse();
            savedCourse.setCourse(optionalCourse.get());
            savedCourse.setUser(optionalUser.get());

            savedCourseRepository.save(savedCourse);
            logger.info("User Course Save Success");
            apiResponse.setStatus(RequestStatus.SUCCESS.getStatus());
            apiResponse.setResponseCode(ResponseCodes.SUCCESS);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_SAVE_SUCCESS, null));

        } catch (EduConnectValidationsException rve) {
            logger.error("User Course Save Failure", rve);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(rve.getCode());
            apiResponse.setMessage(rve.getMessage());
        } catch (Exception e) {
            logger.error("User Course Save Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.COURSE_SAVE_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.COURSE_SAVE_FAILED, null));
        }

        logger.info("User Course Save Ends");
        return apiResponse;
    }

    @Override
    public ApiResponse getSavedCourses(ApiRequest apiRequest) {
        logger.info("User Get Saved Courses Starts");
        ApiResponse apiResponse = new ApiResponse();

        try {
            // Validate request
            if (apiRequest == null || apiRequest.getUserId() == null) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                        messages.getMandatoryValidationFailureMessage("ApiRequest"));
            }

            Optional<User> optionalUser = userRepository.findById(apiRequest.getUserId());
            if (optionalUser.isEmpty()) {
                throw new EduConnectValidationsException(ResponseCodes.BAD_REQUEST_CODE,
                        messages.getMessageForResponseCode(ResponseCodes.USER_NOT_FOUND, null));
            }

            List<SavedCourse> savedCourseByUser = savedCourseRepository.findSavedCourseByUser(optionalUser.get());
            if (savedCourseByUser.isEmpty()) {
                apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.SAVED_COURSES_NOT_FOUND, null));
            }
            apiResponse.setSavedCourseList(savedCourseByUser);
            logger.info("User Get Saved Courses Success");
            apiResponse.setStatus(RequestStatus.SUCCESS.getStatus());
            apiResponse.setResponseCode(ResponseCodes.SUCCESS);

        } catch (EduConnectValidationsException rve) {
            logger.error("User Get Saved Courses Failure", rve);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(rve.getCode());
            apiResponse.setMessage(rve.getMessage());
        } catch (Exception e) {
            logger.error("User Get Saved Courses Failure", e);
            apiResponse.setStatus(RequestStatus.FAILURE.getStatus());
            apiResponse.setResponseCode(ResponseCodes.SAVED_COURSES_FETCH_FAILED);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.SAVED_COURSES_FETCH_FAILED, null));
        }
        logger.info("User Get Saved Courses Ends");
        return apiResponse;
    }
}
