import React from 'react';
import {Box, Grid, Typography} from "@mui/material";

const Privacy = () => {
    return (
            <Grid item>
                <Typography sx={{fontWeight: 700, fontSize: 45}}>
                    Privacy Policy
                </Typography>
                <Box sx={{maxWidth: 900, mt: 4, mb: 5}}>
                    <Typography sx={{color: '#757575', fontWeight: 500, fontSize: 16}}>
                        At EduConnect, we are committed to protecting your privacy. This Privacy Policy outlines how we
                        collect, use, disclose, and safeguard your information when you visit our website and utilize
                        our services. We may collect personal information from you when you register on our site,
                        subscribe to our newsletter, or interact with us. The types of information we may collect
                        include your name, email address, phone number, educational background, and any other
                        information you choose to provide.
                    </Typography>
                    <Typography sx={{color: '#757575', fontWeight: 500, fontSize: 16, mt: 2}}>
                        We may use the information we collect for various purposes, including providing and maintaining
                        our services, notifying you about changes to our services, allowing you to participate in
                        interactive features when you choose to do so, providing customer support, gathering analysis to
                        improve our services, monitoring usage, and detecting, preventing, and addressing technical
                        issues. Importantly, we do not sell or rent your personal information to third parties. However,
                        we may share your information with service providers to facilitate our services and with legal
                        authorities if required by law or to protect our rights.
                    </Typography>
                    <Typography sx={{color: '#757575', fontWeight: 500, fontSize: 16, mt: 2}}>
                        We take the security of your personal information seriously and implement reasonable security
                        measures to protect it. However, no method of transmission over the internet or method of
                        electronic storage is 100% secure, and we cannot guarantee its absolute security. You have the
                        right to access your personal information, request correction of inaccurate or incomplete
                        information, request deletion of your personal data, and withdraw your consent to the processing
                        of your data at any time. We may update our Privacy Policy from time to time. We will notify you
                        of any changes by posting the new Privacy Policy on this page and updating the effective date.
                        If you have any questions or concerns about this Privacy Policy, please contact us
                    </Typography>
                </Box>
            </Grid>
    );
};

export default Privacy;