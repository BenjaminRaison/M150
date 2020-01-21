package eu.benjaminraison.bzz.m150.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.actuate.security.AuthenticationAuditListener;
import org.springframework.security.authentication.event.AbstractAuthenticationEvent;
import org.springframework.stereotype.Component;

@Component
public class AuditLogger extends AuthenticationAuditListener {

    private static final Logger LOG = LoggerFactory.getLogger(AuditLogger.class);

    // Log authentication events
    @Override
    public void onApplicationEvent(AbstractAuthenticationEvent event) {
        super.onApplicationEvent(event);
        LOG.info(event.toString());
    }

}
