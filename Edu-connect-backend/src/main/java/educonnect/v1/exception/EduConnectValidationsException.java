package educonnect.v1.exception;
import educonnect.v1.util.RequestStatus;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EduConnectValidationsException extends RuntimeException {
    private String status;
    private String code;

    public EduConnectValidationsException() {
        super();
    }

    public EduConnectValidationsException(String message) {
        super(message);
    }

    public EduConnectValidationsException(String statusCode, String message) {
        super(message);
        this.setStatus(RequestStatus.FAILURE.getStatus());
        this.code = statusCode;
    }

    public EduConnectValidationsException(String message, Throwable cause) {
        super(message, cause);
    }

    public EduConnectValidationsException(Throwable cause) {
        super(cause);
    }

    protected EduConnectValidationsException(String message, Throwable cause, boolean enableSuppression,
                                             boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
