package educonnect.v1.entity;

import educonnect.v1.dto.UniversityStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "university")
public class University {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int universityId;
    private String universityName;
    private String description;
    private String link;
    private UniversityStatus universityStatus;
    @Lob
    @Column(name = "logo", columnDefinition = "LONGBLOB")
    private byte[] logo;

    @Lob
    @Column(name = "ugcLetter", columnDefinition = "LONGBLOB")
    private byte[] ugcLetter;

    @Column(name = "logo_content_type")
    private String logoContentType;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
