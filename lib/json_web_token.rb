module JsonWebToken
  SECRET_KEY = Rails.application.secret_key_base.to_s

  def self.encode_token(user_id)
    JWT.encode({ user_id: user_id, exp: (Time.now + 24.hours).to_i }, SECRET_KEY)
  end

  def self.decode_token(token)
    decoded = JWT.decode(token, SECRET_KEY).first
    HashWithIndifferentAccess.new(decoded)
  rescue JWT::DecodeError
    nil
  end
end