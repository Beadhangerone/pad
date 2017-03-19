class PressetController < ApplicationController
	before_action :check_presset


	def show
		@presset = Presset.where(name: params[:name]).take
		@audios = {}
		@presset.sounds.each do |sound|
			@audios[sound.key] = sound.source
		end
	end

	private

	def check_presset
		presset = params[:presset]
		redirect_to presset_show_path(presset) if presset
	end

end
