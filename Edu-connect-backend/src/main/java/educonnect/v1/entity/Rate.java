package educonnect.v1.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "rate")
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rateId;
    private String userName;
    private int rate;
    private String feedback;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
