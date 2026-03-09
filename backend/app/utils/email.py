from flask import current_app, render_template_string
from flask_mail import Message
from app import mail
import os

def send_email(to, subject, body, html=None):
    """Send email"""
    try:
        msg = Message(
            subject=subject,
            sender=current_app.config['MAIL_DEFAULT_SENDER'],
            recipients=[to] if isinstance(to, str) else to
        )
        msg.body = body
        if html:
            msg.html = html
        
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False

def send_welcome_email(user_email, user_name):
    """Send welcome email to new user"""
    subject = f"Bienvenido a {current_app.config.get('APP_NAME', 'CBTIS No. 88')}"
    
    body = f"""
    Hola {user_name},
    
    ¡Bienvenido a CBTIS No. 88!
    
    Tu cuenta ha sido creada exitosamente.
    
    Saludos,
    Equipo CBTIS No. 88
    """
    
    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #7d1f3c;">¡Bienvenido a CBTIS No. 88!</h2>
            <p>Hola <strong>{user_name}</strong>,</p>
            <p>Tu cuenta ha sido creada exitosamente.</p>
            <p>Ahora puedes acceder a todos nuestros servicios.</p>
            <br>
            <p>Saludos,<br>Equipo CBTIS No. 88</p>
        </body>
    </html>
    """
    
    return send_email(user_email, subject, body, html)

def send_preficha_confirmation(email, name, folio):
    """Send preficha confirmation email"""
    subject = "Confirmación de Preficha - CBTIS No. 88"
    
    body = f"""
    Hola {name},
    
    Tu solicitud de preficha ha sido registrada exitosamente.
    
    Folio: {folio}
    
    Por favor conserva este número de folio para futuras referencias.
    
    Saludos,
    Equipo CBTIS No. 88
    """
    
    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #7d1f3c;">Confirmación de Preficha</h2>
            <p>Hola <strong>{name}</strong>,</p>
            <p>Tu solicitud de preficha ha sido registrada exitosamente.</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Folio:</strong> {folio}</p>
            </div>
            <p>Por favor conserva este número de folio para futuras referencias.</p>
            <p>El siguiente paso es realizar el pago correspondiente.</p>
            <br>
            <p>Saludos,<br>Equipo CBTIS No. 88</p>
        </body>
    </html>
    """
    
    return send_email(email, subject, body, html)

def send_password_reset_email(email, name, reset_token):
    """Send password reset email"""
    reset_url = f"{current_app.config.get('FRONTEND_URL')}/reset-password?token={reset_token}"
    
    subject = "Recuperación de Contraseña - CBTIS No. 88"
    
    body = f"""
    Hola {name},
    
    Has solicitado restablecer tu contraseña.
    
    Para crear una nueva contraseña, haz clic en el siguiente enlace:
    {reset_url}
    
    Este enlace expirará en 1 hora.
    
    Si no solicitaste este cambio, ignora este correo.
    
    Saludos,
    Equipo CBTIS No. 88
    """
    
    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #7d1f3c;">Recuperación de Contraseña</h2>
            <p>Hola <strong>{name}</strong>,</p>
            <p>Has solicitado restablecer tu contraseña.</p>
            <p>Para crear una nueva contraseña, haz clic en el siguiente botón:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="{reset_url}" style="background-color: #7d1f3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Restablecer Contraseña
                </a>
            </div>
            <p style="color: #666; font-size: 14px;">Este enlace expirará en 1 hora.</p>
            <p style="color: #666; font-size: 14px;">Si no solicitaste este cambio, ignora este correo.</p>
            <br>
            <p>Saludos,<br>Equipo CBTIS No. 88</p>
        </body>
    </html>
    """
    
    return send_email(email, subject, body, html)