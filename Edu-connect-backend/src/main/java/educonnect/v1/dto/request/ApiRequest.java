package educonnect.v1.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import educonnect.v1.dto.CourseDTO;
import educonnect.v1.dto.RateDTO;
import educonnect.v1.dto.UniversityDTO;
import educonnect.v1.dto.UserDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiRequest {
    private UniversityDTO universityDTO;
    private CourseDTO courseDTO;
    private Integer universityId;
    private UserDTO userDTO;
    private RateDTO rateDTO;
    private Integer userId;
    private Integer courseId;
}
