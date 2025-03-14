class OrthographyController < ApplicationController
  skip_before_action :verify_authenticity_token

  # POST /correct_orthography
  def correct
    # Extract the text from the request body
    text = params.require(:text)

    # Call the AI service to correct orthography
    corrected_text = call_ai_service(text)

    # Return the corrected text as JSON
    render json: { corrected_text: corrected_text }
  rescue StandardError => e
    # Log the error and return a user-friendly response
    Rails.logger.error("Orthography Correction Error: #{e.message}")
    render json: { error: "An error occurred while correcting orthography." }, status: :unprocessable_entity
  end

  private

  # Method to interact with the AI service
  def call_ai_service(text)
    headers = {
      'Content-Type' => 'application/json',
      'Authorization' => "Bearer #{ENV['DEEPSEEK_API_KEY']}"
    }

    body = {
      model: "deepseek-chat", # Specify the model you want to use
      messages: [{ role: "user", content: "Correct this text: #{text}" }],
      temperature: 0.7, # Adjust creativity (0 = strict, 1 = creative)
      max_tokens: 500 # Limit response length
    }.to_json

    response = Faraday.post(ENV['API_URL'], body, headers)

    if response.success?
      return JSON.parse(response.body)['choices'][0]['message']['content'].split('"')[1]
    else
      "Error: #{response.status} - #{response.body}"
    end
  end
end
